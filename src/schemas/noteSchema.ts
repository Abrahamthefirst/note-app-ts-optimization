import { z } from 'zod';

export const noteTagSchema = z.object({
  label: z.string(),
  id: z.string(),
});
export const noteFormSchema = z.object({
  title: z.string().min(1, { message: 'title is required' }),
  body: z.string().min(1, { message: 'body is required' }),
  tags: z.array(noteTagSchema).optional(),
});

export type NoteFormInputs = z.infer<typeof noteFormSchema>;