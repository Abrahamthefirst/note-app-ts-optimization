import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassword } from '../api/auth';
import { useForm } from 'react-hook-form';
import {
  type ForgotPasswordFormInput,
  ForgotPasswordFormSchema,
} from '../schema/auth.schema';
import { Link } from 'react-router-dom';
import { errorToast, successToast } from '@/lib/toast';
const ForgotPasswordForm = () => {
  const onSubmit = async ({ email }: ForgotPasswordFormInput) => {
    const { data: successMsg, errMsg } = await forgotPassword({ email });
    if (errMsg) errorToast(errMsg);
    if (successMsg) successToast(successMsg);
  };

  const form = useForm<ForgotPasswordFormInput>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-[clamp(.5rem,1rem+8vw,20rem)] text-black"
        >
          <div className="flex w-full flex-col sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="border border-black" />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex gap-4">
        <Link to="/login">Back to Login</Link>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
