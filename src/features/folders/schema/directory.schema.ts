import { z } from 'zod';

export const createDirectorySchema = z.object({
  name: z.string('😔').min(1, 'name is required'),
});

export type CreateDirectoryInput = z.infer<typeof createDirectorySchema>;
