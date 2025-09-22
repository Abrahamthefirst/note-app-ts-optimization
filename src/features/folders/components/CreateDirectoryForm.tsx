import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  type CreateDirectoryInput,
  createDirectorySchema,
} from '../schema/directory.schema';
import { useCreateDirectory } from '@/features/folders/hooks/useDirectories';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const CreateDirectoryForm = () => {
  const { mutate, isPending } = useCreateDirectory();
  const form = useForm<CreateDirectoryInput>({
    resolver: zodResolver(createDirectorySchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(formValues: CreateDirectoryInput) {
    mutate(formValues);
    form.reset();
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-[clamp(.5rem,1rem+8vw,20rem)] text-black  "
      >
        <div className="justify-between flex w-full sm:flex-row sm:items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input
                    {...field}
                    className="border border-black text-white"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
        </div>

        <div className="mx-2 flex gap-4 my-2">
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            Create Directory
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateDirectoryForm;
