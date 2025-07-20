import z from 'zod';
export const MeetingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  agentId:z.string().min(1, 'Agent is required')
});

export const MeetingsUpdateSchema=MeetingsSchema.extend({
  id:z.string().min(1,'ID is required')
})