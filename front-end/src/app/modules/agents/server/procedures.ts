import { baseProcedure, ProtectedProcedure } from "@/trpc/init";
import {createTRPCRouter} from '@/trpc/init';
import { db } from "@/db";
import { agents } from "@/db/schema";
import { create } from "domain";
import { AgentSchema, AgentsUpdateSchema } from "./schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { count,desc,sql,getTableColumns,and,ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
export const agentsRouter = createTRPCRouter({
  update:ProtectedProcedure
         .input(AgentsUpdateSchema)
         .mutation(async({input,ctx})=>{
            const[removedAgent]=await db.update(agents).set(input).where(
              and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id)
              )
            ).returning();
            if(!removedAgent){
              throw new TRPCError({code:"NOT_FOUND",message:"Agent Not Found"});
            }
  }),
  remove:ProtectedProcedure
         .input(z.object({id:z.string()}))
         .mutation(async({input,ctx})=>{
            const[removedAgent]=await db.delete(agents).where(
              and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id)
              )
            ).returning();
            if(!removedAgent){
              throw new TRPCError({code:"NOT_FOUND",message:"Agent Not Found"});
            }
  }),
  getOne: ProtectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{  
    const [data]=await db.select(
      {
        ...getTableColumns(agents),
        meetingCount:sql<number>`5`,
      }
    ).from(agents).where(
      and(
        eq(agents.id, input.id),
        eq(agents.userId, ctx.auth.user.id),
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
        ...getTableColumns(agents),
        meetingCount:sql<number>`1`,
    })

    .from(agents)
    .where(and(
      eq(agents.userId,ctx.auth.user.id),
      search ? ilike(agents.name,`%${search}%`):undefined
    ))
    .orderBy(desc(agents.id),desc(agents.createdAt))
    .limit(pageSize)
    .offset((page-1)*pageSize);
    const [total]=await db
          .select({count:count()})
          .from(agents)
          .where(and(
              eq(agents.userId,ctx.auth.user.id),
              search ? ilike(agents.name,`%${search}%`):undefined
          ))
    const totalPages=Math.ceil(total.count/pageSize);
    return {
      items:data,
      total:total.count,
      totalPages,
    }
  }),
  create: ProtectedProcedure
    .input(AgentSchema)
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx as { auth: { user: { id: string } } };
      const [createdAgent] = await db
        .insert(agents) 
        .values({
          ...input,
          userId: auth.user.id,
          instrcuctions: input.instruction, 
        })
        .returning();
      return createdAgent;
    })
});
