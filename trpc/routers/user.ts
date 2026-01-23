
import {
  createTRPCRouter,
  adminProtectedProcedure,
} from "@/trpc/init";
import prisma from "@/lib/db";


export const userRouter = createTRPCRouter({
  userList: adminProtectedProcedure
    .query(async() => {
      const users = await prisma.user.findMany();
      return users
    })
  });

