import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { signup } from '@/features/auth/api/auth';
import 'react-phone-input-2/lib/style.css';
import {
  RegisterFormSchema,
  type RegisterFormInput,
} from '@/features/auth/schema/auth.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { genericToast, errorToast } from '@/lib/toast/index.ts';

import { useEffect, useState, useRef } from 'react';
const SignupForm = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const usernameField = useRef<HTMLInputElement>(null);
  const { dispatch } = useAuth();

  useEffect(() => {
    usernameField.current?.focus();
  }, []);

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      username: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      country_code: '',
    },
  });

  async function onSubmit({
    email,
    username,
    password,
    confirmPassword,
    phone_number,
    country_code,
  }: RegisterFormInput) {
    setPending(true);
    console.log(
      email,
      username,
      password,
      confirmPassword,
      phone_number,
      country_code,
      'Abraham'
    );
    const { data: response, errMsg } = await signup({
      email,
      password,
      username,
      phone_number,
      confirmPassword,
      country_code,
    });
    setPending(false);
    if (errMsg) {
      errorToast(errMsg);
    }

    if (response) {
      genericToast(`Welcome, ${response.data?.username}`);
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
          className="h-full space-y-6 px-[clamp(.5rem,1rem+8vw,20rem)] text-black"
        >
          <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-black"
                      ref={usernameField}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </div>
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
          <Controller
            control={form.control}
            name="phone_number"
            render={({ field: { onChange, value } }) => (
              <FormItem className="w-full">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PhoneInput
                    country={'ng'}
                    value={value}
                    onChange={(
                      phone,
                      country: { [key: string]: string },
                      e,
                      formattedValue
                    ) => {
                      onChange(formattedValue);
                      country.countryCode &&
                        form.setValue('country_code', country?.countryCode);
                    }}
                    containerStyle={{
                      width: '100%',
                      borderColor: 'black',
                      backgroundColor: 'bg-[#f8f8f8]',
                    }}
                    inputStyle={{
                      paddingLeft: '50px',
                      width: '100%',
                      backgroundColor: 'bg-[#f8f8f8]',
                    }}
                    dropdownStyle={{ border: 'none' }}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
          <div className="flex gap-4">
            <Button type="submit" className="cursor-pointer" disabled={pending}>
              Submit
            </Button>
          </div>
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              login
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignupForm;
