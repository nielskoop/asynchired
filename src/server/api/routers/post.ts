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

  getAllCompanies: publicProcedure
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
          company: true,
        },
      });

      const uniqueRoles = new Set();
      const uniquePosts = posts.filter((post) => {
        if (!uniqueRoles.has(post.company)) {
          uniqueRoles.add(post.company);
          return true;
        }
        return false;
      });

      return uniquePosts;
    }),

  getAllSalaries: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        orderBy: [{ datePosted: "desc" }],
        where: {
          salary: {
            contains: input,
          },
        },
        select: {
          id: true,
          salary: true,
        },
      });

      const uniqueRoles = new Set();
      const uniquePosts = posts.filter((post) => {
        if (!uniqueRoles.has(post.salary)) {
          uniqueRoles.add(post.salary);
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
        company: z.string().optional(),
        salary: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        orderBy: [{ datePosted: "desc" }],
        where: {
          location: {
            contains: input.location,
            mode: "insensitive",
          },
          title: {
            contains: input.role,
            mode: "insensitive",
          },
          company: {
            contains: input.company,
            mode: "insensitive",
          },
          salary: {
            contains: input.salary,
            mode: "insensitive",
          },
        },
      });
      return posts;
    }),
});
