import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { User } from "@prisma/client";

import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClients";

export const userRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user?.username) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return filterUserForClient(user);
    }),

  like: privateProcedure
    .input(
     z.number()
    )
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.db.user.upsert({
        where: {
          id: ctx.userId,
        },
        update: {
          likedPosts: [...likedPosts, input],
        },
        create: {
          id: ctx.userId,
          likedPosts: [...likedPosts, input],
        },
      });

      // const post = await ctx.db.post.create({
      //   data: {
      //     authorId,
      //     content: input.content,
      //   },
      // });

      return 'Liked Post updated';
    }),
});
