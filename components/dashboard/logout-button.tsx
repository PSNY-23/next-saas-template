'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton = ({className}:LogoutButtonProps) => {
  const router = useRouter();
  return (
    <Button onClick={() => authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully')
          router.push("/login")
        },
        onError: () => {
          toast.error('Logout failed')
        }
      }
    })} className={className} variant='outline'>
      <LogOut />
      Logout
    </Button>
  );
};
