import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClients";

export const userRouter = createTRPCRouter({
  getUserByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const [clerkUser] = await clerkClient.users.getUserList({
        userId: [input.userId],
      });

      if (!clerkUser?.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      console.log(clerkUser);
      return filterUserForClient(clerkUser);
    }),

  // like: privateProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
  //   const userId = ctx.userId

  //   // const userLiked = ctx.db.user.findFirst({
  //   //   where: {
  //   //       id:"idn_2YmCQFCXpkUkGwyB2MyQTuXo8Nj"
  //   //   }
  //   // })

  //   console.log(userId)

  //   const currUser = await ctx.db.user.update({
  //     where: {
  //       id: "idn_2YmCQFCXpkUkGwyB2MyQTuXo8Nj"
  //     },
  //     data: {
  //       likedPosts: [...likedPosts, input],
  //     },
  //   });

  //   return currUser
  // }),

});
