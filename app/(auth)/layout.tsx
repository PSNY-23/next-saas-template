import { auth } from '@/lib/auth'; // Adjust this import based on your auth setup
import { redirect } from 'next/navigation'; // To handle redirection in Next.js
import React from 'react';
import {headers} from "next/headers"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  // Get session information (this could be through NextAuth or your custom auth system)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If a session exists, redirect the user based on their role
  if (session) {
    if (session.user.role === 'admin') {
      // If the user is an admin, redirect to the admin dashboard
      redirect('/admin/dashboard');
    } else if (session.user.role === 'user') {
      // If the user is a regular user, redirect to the user dashboard
      redirect('/dashboard');
    }
  }

  // If there is no session (i.e., user is not logged in), render the children (login/register pages)
  return <div>{children}</div>;
};

export default AuthLayout;
