'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, formState, control } = form;

  const onSubmit = async (values: RegisterFormValues) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: '/',
    });

    if (error) {
      console.log(error)
      toast.error(error.message ?? 'An error occurred');
      return;
    }

    toast.success('Account created successfully!');
    router.push('/dashboard');
  };

  const handleSocialLogin = () => {
    // Social login logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Tony Stark"
                  aria-describedby="name-error"
                  aria-invalid={!!formState.errors.name}
                  {...field}
                />
              </FormControl>
              {formState.errors.name && (
                <FormMessage id="name-error" className="text-sm text-destructive">
                  {formState.errors.name.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  aria-describedby="email-error"
                  aria-invalid={!!formState.errors.email}
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
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  aria-describedby="password-error"
                  aria-invalid={!!formState.errors.password}
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

        {/* Confirm Password */}
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  aria-describedby="confirmPassword-error"
                  aria-invalid={!!formState.errors.confirmPassword}
                  {...field}
                />
              </FormControl>
              {formState.errors.confirmPassword && (
                <FormMessage id="confirmPassword-error" className="text-sm text-destructive">
                  {formState.errors.confirmPassword.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Registering account…' : 'Register'}
        </Button>

        {/* Social Login */}
        <div className="flex flex-col gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FcGoogle />
            <span>Sign up with Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FaGithub />
            <span>Sign up with GitHub</span>
          </Button>
        </div>

         <div className='text-sm flex items-center justify-center'>
          <p className='text-muted-foreground'>Already have an Account? <Link href='/login' className="text-foreground">Login</Link></p>
        </div>
      </form>
    </Form>
    </CardContent>
    </Card>
  );
}
