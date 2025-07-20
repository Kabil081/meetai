import { baseProcedure, ProtectedProcedure } from "@/trpc/init";
import {createTRPCRouter} from '@/trpc/init';
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { create } from "domain";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { count,desc,sql,getTableColumns,and,ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { MeetingsSchema, MeetingsUpdateSchema } from "./schema";
export const MeetingsRouter = createTRPCRouter({
  update:ProtectedProcedure
           .input(MeetingsUpdateSchema)
           .mutation(async({input,ctx})=>{
              const[removedMeeting]=await db.update(meetings).set(input).where(
                and(
                  eq(meetings.id, input.id),
                  eq(meetings.userId, ctx.auth.user.id)
                )
              ).returning();
              if(!removedMeeting){
                throw new TRPCError({code:"NOT_FOUND",message:"Agent Not Found"});
              }
  }),
  create: ProtectedProcedure
      .input(MeetingsSchema)
      .mutation(async ({ input, ctx }) => {
        const { auth } = ctx as { auth: { user: { id: string } } };
        const [createdMeeting] = await db
          .insert(meetings) 
          .values({
            ...input,
            userId: auth.user.id,
          })
          .returning();
        return createdMeeting;
  }),
  getOne: ProtectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{  
    const [data]=await db.select(
      {
        ...getTableColumns(meetings),
      }
    ).from(meetings).where(
      and(
        eq(meetings.id, input.id),
        eq(meetings.userId, ctx.auth.user.id),
      )
    );
    if(!data){
      throw new TRPCError({code:"NOT_FOUND",message:"Agent Not Found"});
    }
    return [data];
  }),
  getMany: ProtectedProcedure
  .input(z.object({
    page:z.number().default(1),
    pageSize:z.number().min(1).max(100).default(5),
    search:z.string().nullish()
  }))
  .query(async({ctx,input})=>{
    const {page,pageSize,search}=input;

    const data=await db.select({
        ...getTableColumns(meetings),
    })
    .from(meetings)
    .where(and(
      eq(meetings.userId,ctx.auth.user.id),
      search ? ilike(meetings.name,`%${search}%`):undefined
    ))
    .orderBy(desc(meetings.id),desc(meetings.createdAt))
    .limit(pageSize)
    .offset((page-1)*pageSize);
    const [total]=await db
          .select({count:count()})
          .from(meetings)
          .where(and(
              eq(meetings.userId,ctx.auth.user.id),
              search ? ilike(meetings.name,`%${search}%`):undefined
          ))
    const totalPages=Math.ceil(total.count/pageSize);
    return {
      items:data,
      total:total.count,
      totalPages,
    }
  }),
});
