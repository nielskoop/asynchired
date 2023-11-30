// src\server\api\routers\post.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 20,
      orderBy: [{ datePosted: "desc" }],
    });

    return posts;
  }),

  getAllLocations: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        orderBy: [{ datePosted: "desc" }],
        where: {
          location: {
            contains: input,
          },
        },
        select: {
          id: true,
          location: true,
        },
      });

      const uniqueLocations = new Set();
      const uniquePosts = posts.filter((post) => {
        if (!uniqueLocations.has(post.location)) {
          uniqueLocations.add(post.location);
          return true;
        }
        return false;
      });

      return uniquePosts;
    }),

  getAllRoles: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        orderBy: [{ datePosted: "desc" }],
        where: {
          title: {
            contains: input,
          },
        },
        select: {
          id: true,
          title: true,
        },
      });

      const uniqueRoles = new Set();
      const uniquePosts = posts.filter((post) => {
        if (!uniqueRoles.has(post.title)) {
          uniqueRoles.add(post.title);
          return true;
        }
        return false;
      });

      return uniquePosts;
    }),

  getFilteredPosts: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        role: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        orderBy: [{ datePosted: "desc" }],
        where: {
          location: {
            contains: input.location,
          },
          title: {
            contains: input.role,
          },
        },
      });

      return posts;
    }),
});
