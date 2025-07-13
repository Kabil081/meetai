import { baseProcedure, ProtectedProcedure } from "@/trpc/init";
import {createTRPCRouter} from '@/trpc/init';
import { db } from "@/db";
import { agents } from "@/db/schema";
import { create } from "domain";
import { AgentSchema } from "../ui/views/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { count,desc,sql,getTableColumns,and,ilike } from "drizzle-orm";
export const agentsRouter = createTRPCRouter({
  getOne: ProtectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{  
    const [data]=await db.select(
      {
        ...getTableColumns(agents),
        meetingCount:sql<number>`5`,
      }
    ).from(agents).where(eq(agents.id, input.id));
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
