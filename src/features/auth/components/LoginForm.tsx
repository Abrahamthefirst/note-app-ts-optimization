import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/common/PasswordInput';
import {
  type LoginFormInput,
  LoginFormSchema,
} from '../schema/authSchema';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { login } from '@/api/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { genericToast, errorToast } from '@/lib/toast/index.ts';

import { useState, useEffect, useRef } from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
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
    setPending(true);
    const { data: response, errMsg } = await login({ email, password });
    setPending(false);
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
          <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
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
          <div className="flex gap-4">
            <Button type="submit" className="cursor-pointer" disabled={pending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
