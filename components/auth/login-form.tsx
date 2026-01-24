'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import Link from 'next/link';
import { SocialButtons } from './social-buttons';
import { FiLoader } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { AuthHeader } from './auth-header';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit, control, formState } = form;

  async function onSubmit(values: LoginFormSchemaType) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: '/dashboard',
      },
      {
        onSuccess: async () => {
          toast.success('Logged in successfully!');
        },
        onError: ctx => {
          // Better Auth provides error details in the ctx object
          const errorMessage = ctx.error.message || 'User Signin failed';
          toast.error(errorMessage);
          console.error('Sign-in error:', ctx.error);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <AuthHeader title='Login to your account' subtitle='Enter your email below to login to your account'/>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  {formState.errors.email && (
                    <FormMessage id="email-error" className="text-sm text-destructive">
                      {formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  {formState.errors.password && (
                    <FormMessage id="password-error" className="text-sm text-destructive">
                      {formState.errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}

            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
              {formState.isSubmitting && (
                <FiLoader size="small" className="animate-spin text-background" />
              )}
              <span
                className={cn(
                  'transition-all duration-150 ease-in',
                  formState.isSubmitting && 'animate-pulse ml-1'
                )}
              >
                Login
              </span>
            </Button>
          </form>
        </Form>
        {/* Social Login */}
        <SocialButtons className="mt-6" />

        <div className="text-sm flex items-center justify-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an Account?{' '}
            <Link href="/register" className="text-foreground">
              Register
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
