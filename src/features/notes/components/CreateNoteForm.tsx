import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { type CreateNoteInput, createNoteSchema } from '../schema/note.schema';
import CreatableSelect from 'react-select/creatable';
import { useCreateNoteMutation } from '../hooks/useNotes';
import { transformData } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { useTags } from '@/features/tag/hooks/useTags';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const CreateNoteForm = () => {
  const { mutate, isPending: createNotePending } = useCreateNoteMutation();
  const {  data } = useTags();
  const tags = data as TagApiResponse[];

  const { directoryId } = useParams();

  const form = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
      body: '',
      status: true,
      tagNames: [],
    },
  });

  async function onSubmit(formValues: CreateNoteInput) {
    mutate({ directoryId, ...formValues });
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-[clamp(.5rem,1rem+8vw,20rem)] text-black flex-col"
      >
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="what's a note without a title"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagNames"
            render={({ field }) => (
              <FormItem className="min-w-48 cursor-pointer">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <CreatableSelect
                    isMulti
                    className="w-full cursor-pointer !bg-black [&>option]:bg-black rounded-lg"
                    value={
                      field.value?.map((tag) => ({
                        label: tag,
                        value: tag,
                      })) || []
                    }
                    onChange={(newValue) => {
                      const allLabels = newValue.map((tag) => tag.label);
                      const uniqueLabels = new Set(allLabels);
                      const transformedValues = Array.from(uniqueLabels);
                      field.onChange(transformedValues);
                    }}
                    options={tags && transformData(tags)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="what's a note without a body"
                  className="resize-none text-white"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 my-8">
          <Button type="submit" className="cursor-pointer" disabled={createNotePending}>
            Create Note
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNoteForm;
