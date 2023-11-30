import { clerkClient } from "@clerk/nextjs";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";
// import { filterUserForClient } from "~/server/helpers/filterUserForClients";

export const userRouter = createTRPCRouter({
  like: privateProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId;
    // retrieves all information available on front end including email, email id, name, etc.
    const fullUser = userId ? await clerkClient.users.getUser(userId) : null;

    // currently creating duplicates in the array
    if (fullUser?.emailAddresses[0]?.emailAddress) {
      const upsertUser = await ctx.db.user.upsert({
        where: {
          id: fullUser.primaryEmailAddressId!,
        },
        update: {
          likedPosts: { push: input },
        },
        create: {
          id: fullUser.primaryEmailAddressId!,
          name: fullUser.firstName ?? "",
          email: fullUser.emailAddresses[0]?.emailAddress,
          job: "",
          location: "",
          techStack: "",
          education: "",
          profilePicture: fullUser.imageUrl,
          likedPosts: [input],
          dislikedPosts: [],
          appliedPosts: [],
        },
      });

      return upsertUser;
    }
  }),

  dislike: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const fullUser = userId ? await clerkClient.users.getUser(userId) : null;

      if (fullUser?.emailAddresses[0]?.emailAddress) {
        const upsertUser = await ctx.db.user.upsert({
          where: {
            id: fullUser.primaryEmailAddressId!,
          },
          update: {
            dislikedPosts: { push: input },
          },
          create: {
            id: fullUser.primaryEmailAddressId!,
            name: fullUser.firstName ?? "",
            email: fullUser.emailAddresses[0]?.emailAddress,
            job: "",
            location: "",
            techStack: "",
            education: "",
            profilePicture: fullUser.imageUrl,
            likedPosts: [],
            dislikedPosts: [input],
            appliedPosts: [],
          },
        });

        return upsertUser;
      }
    }),

  applied: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      // retrieves all information available on front end including email, email id, name, etc.
      const fullUser = userId ? await clerkClient.users.getUser(userId) : null;

      if (fullUser?.emailAddresses[0]?.emailAddress) {
        const upsertUser = await ctx.db.user.upsert({
          where: {
            id: fullUser.primaryEmailAddressId!,
          },
          update: {
            appliedPosts: { push: input },
          },
          create: {
            id: fullUser.primaryEmailAddressId!,
            name: fullUser.firstName ?? "",
            email: fullUser.emailAddresses[0]?.emailAddress,
            job: "",
            location: "",
            techStack: "",
            education: "",
            profilePicture: fullUser.imageUrl,
            likedPosts: [],
            dislikedPosts: [],
            appliedPosts: [input],
          },
        });

        return upsertUser;
      }
    }),
});
