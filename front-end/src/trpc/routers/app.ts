import { z } from 'zod';
import { agentsRouter } from '@/app/modules/agents/server/procedures';
import {createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  agents:agentsRouter
});
export type AppRouter = typeof appRouter;