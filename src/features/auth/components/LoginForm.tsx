import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/common/PasswordInput';
import { type LoginFormInput, LoginFormSchema } from '../schema/auth.schema';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';
import { login } from '@/features/auth/api/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { genericToast, errorToast } from '@/lib/toast/index.ts';

import { useEffect, useRef } from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const emailField = useRef<HTMLInputElement>(null);
  const { dispatch } = useAuth();

  useEffect(() => {
    emailField.current?.focus();
  }, []);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit({ email, password }: LoginFormInput) {
    const { data: response, errMsg } = await login({ email, password });
    if (errMsg) {
      errorToast(errMsg);
    }

    if (response) {
      genericToast(`Welcome back, ${response.data?.username}`);
      dispatch({
        type: 'LOGIN',
        payload: {
          accessToken: response.data?.access_token,
          user: response?.data,
        },
      });
      navigate('/', { replace: true });
    }
  }

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
                    <Input
                      {...field}
                      className="border border-black"
                      ref={emailField}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>

                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <div className="w-full text-left flex justify-between">
            <Link to="/forgot-password" className="text-left text-sm underline">
              Forgot Password?
            </Link>
             <Link to="/sign-up" className="text-left text-sm underline">
              Create Account
            </Link>
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

export default LoginForm;
