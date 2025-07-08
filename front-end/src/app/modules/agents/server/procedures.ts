import { baseProcedure, ProtectedProcedure } from "@/trpc/init";
import {createTRPCRouter} from '@/trpc/init';
import { db } from "@/db";
import { agents } from "@/db/schema";
import { create } from "domain";
import { AgentSchema } from "../ui/views/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { sql,getTableColumns } from "drizzle-orm";
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
  getMany: ProtectedProcedure.query(async()=>{  
    const data=await db.select().from(agents);
    return data;
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
