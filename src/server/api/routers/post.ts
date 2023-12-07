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
        limit: z.number(),
        cursor: z.number().nullish(),
        location: z.string().optional(),
        role: z.string().optional(),
        company: z.string().optional(),
        salary: z.string().nullable().optional(),
        description: z.string().optional(),
        datePosted: z.date().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const posts = await ctx.db.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
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

          ...(input.salary !== undefined &&
          input.salary !== null &&
          input.salary !== "NO_SALARY"
            ? {
                salary: {
                  contains: input.salary,
                  mode: "insensitive",
                },
              }
            : input.salary === "NO_SALARY"
              ? { salary: { equals: null } } // Checking for null (which includes undefined)
              : {}),
          jobDescription: {
            contains: input.description,
            mode: "insensitive",
          },

          datePosted: {
            gte: input.datePosted,
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return { posts, nextCursor };
    }),

  getFilteredPostsCount: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        role: z.string().optional(),
        company: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
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
        },
      });

      const count = posts.length
      return count;
    }),
});
