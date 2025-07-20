import { AppRouter } from "@/trpc/routers/app";
import { inferRouterOutputs } from "@trpc/server";
export type MeetinGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];