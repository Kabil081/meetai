import { AppRouter } from "@/trpc/routers/app";
import { inferRouterOutputs } from "@trpc/server";
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getMany"];