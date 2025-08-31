// import { Input } from '../ui/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import CreatableSelect from 'react-select/creatable';
// import { transformData } from '@/lib/utils';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { type MultiValue } from 'react-select';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
// import useTags from '@/features/tag/useTag';
// import {
//   useNotesQuery,
//   useCreateNoteMutation,
// } from '@/features/notes/hooks/useNotes';
// import { noteFormSchema, type NoteFormInputs } from '@/schemas/noteSchema';

// const CreateNoteForm = () => {
//   const { error, data: notes } = useNotesQuery();
//   const createNote = useCreateNoteMutation();
//   const { error: tagError, tags } = useTags('fetchAll');
//   const navigate = useNavigate();

//   const form = useForm<NoteFormInputs>({
//     resolver: zodResolver(noteFormSchema),
//     defaultValues: {
//       title: '',
//       body: '',
//       tags: [],
//     },
//   });

//   function onSubmit({ title, tags, body }: NoteFormInputs) {
//     createNote({ title, body, tags });
//     navigate('/');
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-6 px-[clamp(.5rem,1rem+8vw,20rem)]"
//       >
//         <div className="flex flex-col justify-between sm:flex-row sm:items-center">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Tell us a little bit about yourself"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem className="min-w-48 cursor-pointer">
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <CreatableSelect
//                     isMulti
//                     className="w-full cursor-pointer !bg-black [&>option]:bg-black"
//                     value={
//                       field.value?.map(
//                         (tag: { label: string; id: string }) => ({
//                           label: tag.label,
//                           value: tag.id,
//                         })
//                       ) || []
//                     }
//                     onChange={(
//                       newValue: MultiValue<{
//                         label: string;
//                         value: string;
//                         __isNew__?: boolean;
//                       }>
//                     ) => {
//                       const transformedValues = newValue.map((tag) => ({
//                         label: tag.label,
//                         id: tag.__isNew__ ? uuidv4() : tag.value,
//                       }));
//                       field.onChange(transformedValues);
//                     }}
//                     options={tags && transformData(tags)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="body"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Body</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us a little bit about yourself"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex gap-4">
//           <Button type="submit" className="cursor-pointer">
//             Submit
//           </Button>
//           <Button
//             className="cursor-pointer"
//             type="button"
//             onClick={() => navigate(-1)}
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };
// export default CreateNoteForm;
