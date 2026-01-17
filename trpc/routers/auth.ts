import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { auth } from '@/lib/auth';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(6),
        name: z.string().min(3),
      })
    )
    .mutation(async ({ input }) => {
      console.log('mutating the auth user');
      const { name, email, password } = input;
      console.log('user-data: ', { name, email, password });
      try {
        // Use the server-side auth method - it expects a body object
        const user = await auth.api.signUpEmail({
          body: {
            email,
            password,
            name,
          },
        });
        console.log('response: ', user);
        return user;
      } catch (error) {
        console.log(error);
        throw new Error('Sign- fupailed');
      }
    }),
});
