import { clerkClient } from "@clerk/nextjs";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";
// import { filterUserForClient } from "~/server/helpers/filterUserForClients";

export const userRouter = createTRPCRouter({
  getUserById: privateProcedure
    .query(async ({ ctx }) => {
      // You can access input properties like input.userId here
      const userId = ctx.userId;
      const fullUser = userId ? await clerkClient.users.getUser(userId) : null;
      try {
        // Fetch user data from the database using Prisma
        const user = await ctx.db.user.findUnique({
          where: {
            id: fullUser!.primaryEmailAddressId!,
          },
          // Add more options if needed
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    }),

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
