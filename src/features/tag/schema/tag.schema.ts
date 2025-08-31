import { z } from 'zod';

export const createTagSchema = z.object({
 name: z.string('Please enter a tag name'),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
