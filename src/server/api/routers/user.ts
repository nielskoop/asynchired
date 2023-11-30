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

  like: privateProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId
    // retrieves all information available on front end including email, email id, name, etc.
    const fullUser = userId ? await clerkClient.users.getUser(userId) : null;

    if (fullUser) {
      const upsertUser = await ctx.db.user.upsert({
        where: {
          id: fullUser.primaryEmailAddressId!,
        },
        update: {
          likedPosts: { push: input },
        },
        create: {
          id: fullUser.primaryEmailAddressId!,
          name: fullUser.firstName || "",
          email: fullUser.emailAddresses[0]?.emailAddress!,
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


    // console.log('full user log: ', fullUser)
    // // const userLiked = ctx.db.user.findFirst({
    // //   where: {
    // //       id:"idn_2YmCQFCXpkUkGwyB2MyQTuXo8Nj"
    // //   }
    // // })

    // console.log(userId)

    // const currUser = await ctx.db.user.update({
    //   where: {
    //     // id: "user_2YmCQTqn7yeZLLhYZd5RH4EaM18"
    //     // id: "idn_2YmCQFCXpkUkGwyB2MyQTuXo8Nj"
    //   },
    //   data: {
    //     likedPosts: [...likedPosts, input],
    //   },
    // });

    // return currUser
  }),

});


// const upsertUser = await prisma.user.upsert({
//   where: {
//     email: "viola@prisma.io",
//   },
//   update: {
//     name: "Viola the Magnificent",
//   },
//   create: {
//     email: "viola@prisma.io",
//     name: "Viola the Magnificent",
//   },
// });