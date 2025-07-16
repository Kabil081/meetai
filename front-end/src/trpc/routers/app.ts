import { z } from 'zod';
import { agentsRouter } from '@/app/modules/agents/server/procedures';
import {createTRPCRouter } from '../init';
import { MeetingsRouter } from '@/app/modules/meetings/server/procedure';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  meetings:MeetingsRouter
});
export type AppRouter = typeof appRouter;