'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { LoaderIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton = ({className}:LogoutButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      toast.success('Logged out successfully');
      router.push('/login');
    }
    catch (error) {
      toast.error('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignOut} className={className} variant='outline'>
      {isLoading ? <LoaderIcon className='animate-spin'/> : <LogOut className='mr-2' />}
      <span>Logout</span>
    </Button>   
  );
};
