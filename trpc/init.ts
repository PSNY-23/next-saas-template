import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return {session : session ?? null};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const publicProcedure = t.procedure;
export const userProtectedProcedure = t.procedure.use(async(opts) => {
   // Check if session is present and valid
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authorized'
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
    },
  });
});
export const adminProtectedProcedure = t.procedure.use(async(opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authorized'
    });
  }

  //Check if the role = admin
  if(opts.ctx.session.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin access required'
    })
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
    },
  });
});

