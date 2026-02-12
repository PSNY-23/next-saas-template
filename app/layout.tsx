import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TRPCReactProvider } from '@/trpc/client';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/scroll-to-top'
import { LenisClient } from '@/components/lenis-client';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Saas Template',
  description: 'A modern SaaS template built with Next.js, Tailwind CSS, tRPC, better-auth with social logins, admin dashboard, and more. Get started quickly with a fully functional boilerplate for your next SaaS project.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <LenisClient/>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider 
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
        >
          <TRPCReactProvider>
            {children}
            <ScrollToTop/>
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
    </>
  );
}
