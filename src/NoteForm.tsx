




//  <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <CreatableReactSelect
//                     value={
//                       field.value
//                         ? field.value.map((tag: Tag) => ({
//                             label: tag.label,
//                             value: uuidv4(),
//                           }))
//                         : []
//                     }
//                     onChange={(newValue: any) => {
//                       const formTags: Tag[] = newValue
//                         ? newValue.map(
//                             (option: { label: string; value: string }) => {
//                               return {
//                                 label: option.label,
//                                 id: option.value,
//                               };
//                             }
//                           )
//                         : [];
//                       field.onChange(formTags);
//                     }}
//                     isMulti
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="markDown"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Body</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex gap-4 justify-end">
//             <Button type="submit" className="bg-blue-400 cursor-pointer">
//               Save
//             </Button>
//             <Link to="..">
//               <Button type="submit" className="bg-red-400 cursor-pointer">
//                 Cancel
//               </Button>
//             </Link>
//           </div>
//         </form>
//       </Form>
//     </div>