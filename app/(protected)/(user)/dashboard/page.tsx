'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

   // redirect as a side-effect
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <p className="text-center mt-8 text-white">Loading...</p>;
  }

  if (!session?.user) {
    return null; // render nothing while redirecting
  }

  // ✅ fully narrowed
  const user = session.user;

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || 'User'}!</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => authClient.signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
