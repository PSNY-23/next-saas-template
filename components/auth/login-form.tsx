'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {

  const router = useRouter();
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit, control, formState } = form;

  async function onSubmit(values: LoginFormSchemaType) {
     const {data, error} = await authClient.signIn.email({
      email: values.email,
      password: values.password
     });

     if(error) {
      toast.error(error.message || 'User Signin failed');
      console.error(error.message);
      return;
     }
     toast.success('Logged in successfully!');
    router.push('/dashboard');

  }

  const handleSocialLogin = () => {
    // Implement social login logic (e.g., redirect to OAuth flow)
    console.log('Redirect to social login');
  };

  return (
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
          {formState.isSubmitting ? 'Logging...' : 'Log In'}
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
            <span>Sign in with Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FaGithub />
            <span>Sign in with GitHub</span>
          </Button>
        </div>

        <div className='text-sm flex items-center justify-center'>
          <p className='text-muted-foreground'>Don&apos;t have an Account? <Link href='/register' className="text-foreground">Register</Link></p>
        </div>
      </form>
    </Form>
  );
}
