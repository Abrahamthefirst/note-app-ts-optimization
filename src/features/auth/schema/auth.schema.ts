import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.email('😔').min(1, '😔'),
  password: z.string('Password is required').min(1, 'Password is required'),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.email('😔').min(1, '😔'),
});

export const RegisterFormSchema = z
  .object({
    username: z
      .string('username should be a string')
      .min(2, 'username requires a minimum of 2 letters'),
    password: z
      .string('Input a password')
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      }),
    confirmPassword: z.string('confirm your password'),
    country_code: z.string('').min(2).max(3),
    email: z.email('Email is required'),
    phone_number: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string('Input a password')
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      }),
    confirmPassword: z.string('confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });


export type LoginFormInput = z.infer<typeof LoginFormSchema>;
export type RegisterFormInput = z.infer<typeof RegisterFormSchema>;
export type ForgotPasswordFormInput = z.infer<typeof ForgotPasswordFormSchema>;
export type ResetPasswordFormInput = z.infer<typeof ResetPasswordFormSchema>
