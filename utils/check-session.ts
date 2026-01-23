import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const chekcAdminSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user.role) {
    redirect('/login');
  }
  if (session.user.role === 'user') {
    redirect('/dashboard');
  }
};
export const checkUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }
  if (session.user.role === 'admin') {
    redirect('/admin/dashboard');
  }
};
export const checkNoSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.role === 'admin') {
    redirect('/admin/dashboard');
  }
  if (session && session.user.role === 'user') {
    redirect('/dashboard');
  }
};
