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
import { resetPassword } from '../api/auth';
import { useForm } from 'react-hook-form';
import {
  type ResetPasswordFormInput,
  ResetPasswordFormSchema,
} from '../schema/auth.schema';
import { errorToast, successToast } from '@/lib/toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const onSubmit = async ({ password }: ResetPasswordFormInput) => {
    if (token) {
      const { data: successMsg, errMsg } = await resetPassword({
        password,
        token,
      });
      if (errMsg) errorToast(errMsg);
      if (successMsg) {
        successToast(successMsg);
        navigate('/login');
      }
    }
  };

  const form = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-[clamp(.5rem,1rem+8vw,20rem)] text-black"
        >
          <div className="flex w-full flex-col justify-between sm:items-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-2 w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border border-black"
                    />
                  </FormControl>

                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-2 w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border border-black"
                    />
                  </FormControl>

                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ResetPasswordForm;
