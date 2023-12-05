import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // USER
  getUser: privateProcedure
    .input(z.string().nullable().optional())
    .query(async ({ ctx, input }) => {
      if (input === null) {
        // Handle the case when input is null
        // Return null or handle it as per your application's logic
        return null;
      }

      const user = await ctx.db.user?.findUnique({
        where: {
          id: input, // Now input is either string or undefined
        },
      });

      return user;
    }),

  // LIKES
  getLikes: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userLikes = await ctx.db.user?.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        likedPosts: true,
      },
    });
    const likedJobs = await ctx.db.post.findMany({
      where: {
        id: {
          in: userLikes?.likedPosts,
        },
      },
    });
    return likedJobs;
  }),

  like: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const updateUser = await ctx.db.user?.update({
          where: {
            id: userId,
          },
          data: {
            likedPosts: { push: input.postId },
          },
        });
        return updateUser;
      }
    }),
  unLike: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        // Fetch the current user's likedPosts
        const user = await ctx.db.user?.findUnique({
          where: { id: userId },
          select: { likedPosts: true },
        });

        if (user?.likedPosts) {
          // Remove the postId from the likedPosts array
          const updatedLikedPosts = user?.likedPosts.filter(
            (postId) => postId !== input.postId,
          );

          // Update the user record with the new array
          const updateUser = await ctx.db.user?.update({
            where: { id: userId },
            data: { likedPosts: updatedLikedPosts },
          });

          return updateUser;
        }
      }
    }),

  // DISLIKES
  getDisikes: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userDislikes = await ctx.db.user?.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          dislikedPosts: true,
        },
      });
      const DislikedJobs = await ctx.db.post.findMany({
        where: {
          id: {
            in: userDislikes?.dislikedPosts,
          },
        },
      });
      return DislikedJobs;
    }),

  dislike: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const updateUser = await ctx.db.user?.update({
          where: {
            id: userId,
          },
          data: {
            dislikedPosts: { push: input.postId },
          },
        });
        return updateUser;
      }
    }),
  unDislike: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const user = await ctx.db.user?.findUnique({
          where: { id: userId },
          select: { dislikedPosts: true },
        });

        if (user?.dislikedPosts) {
          const updatedDislikedPosts = user?.dislikedPosts.filter(
            (postId) => postId !== input.postId,
          );

          const updateUser = await ctx.db.user?.update({
            where: { id: userId },
            data: { dislikedPosts: updatedDislikedPosts },
          });

          return updateUser;
        }
      }
    }),

  // APPLIES
  getApplied: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userApplied = await ctx.db.user?.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          appliedPosts: true,
        },
      });
      const appliedJobs = await ctx.db.post.findMany({
        where: {
          id: {
            in: userApplied?.appliedPosts,
          },
        },
      });
      return appliedJobs;
    }),
  
  updateProfile: privateProcedure
  .input(z.object({ job: z.string(), location: z.string(), techStack: z.string(), education: z.string(), userId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = input.userId;
      if (userId) {
        const updateUser = await ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            job: input.job,
            location: input.location,
            techStack: input.techStack,
            education: input.education
          },
        });
        return updateUser;
    }
  }),

  getProfile: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: input,
      },
      select: {
        job: true,
        location: true,
        techStack: true,
        education: true
      }
    });
    return user;
  }),
  
  apply: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const updateUser = await ctx.db.user?.update({
          where: {
            id: userId,
          },
          data: {
            appliedPosts: { push: input.postId },
          },
        });
        return updateUser;
      }
    }),
  unApply: privateProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const user = await ctx.db.user?.findUnique({
          where: { id: userId },
          select: { appliedPosts: true },
        });

        if (user?.appliedPosts) {
          const updatedAppliedPosts = user?.appliedPosts.filter(
            (postId) => postId !== input.postId,
          );

          const updateUser = await ctx.db.user?.update({
            where: { id: userId },
            data: { appliedPosts: updatedAppliedPosts },
          });

          return updateUser;
        }
      }
    }),
});
