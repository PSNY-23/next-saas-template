'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FiLoader } from 'react-icons/fi'; // Spinner icon

interface SocialButtonsProps {
  className?: string;
}

export const SocialButtons = ({ className }: SocialButtonsProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null); // Track which provider is loading

  const handleSocialLogin = async (providerName: string) => {
    setIsLoading(providerName); // Start loading for the specific provider
    try {
      // Initiating social login
      const { data, error } = await authClient.signIn.social({
        provider: providerName,
        callbackURL: '/dashboard',
      }, {
        onSuccess: () => {
          toast.success('Sign in successful');
        }, 
        onError: (ctx)=> {
         console.log(ctx.error.message);
         toast.error(ctx.error.message ?? 'An error occurred');
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(null); // Reset loading state after the request is completed
    }
  };

  return (
    <div className={cn('flex flex-col gap-2 mt-2', className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('google')}
        className="w-full flex items-center justify-center space-x-2"
        disabled={isLoading !== null} // Disable button while loading
      >
        {isLoading === 'google' ? (
          <FiLoader size={20} className="animate-spin" />
        ) : (
          <FcGoogle />
        )}
        <span className={cn(isLoading === 'github' &&'animate-pulse')}>Sign up with Google</span>
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('github')}
        className="w-full flex items-center justify-center space-x-2"
        disabled={isLoading !==  null} // Disable button while loading
      >
        {isLoading === 'github' ? (
          <FiLoader size={20} className="animate-spin" />
        ) : (
          <FaGithub />
        )}
        <span className={cn(isLoading === 'github' &&'animate-pulse')}>Sign up with GitHub</span>
      </Button>
    </div>
  );
};
