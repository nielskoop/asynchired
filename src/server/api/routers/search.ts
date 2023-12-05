import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({


  // SAVED SEARCHES
  saveSearch: privateProcedure
    .input(
      z.object({
        userId: z.string().optional().nullable(),
        searchName: z.string(),
        title: z.string().optional(),
        location: z.string().optional(),
        company: z.string().optional(),
        jobDescription: z.string().optional(),
        salary: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = input.userId;

      if (userId) {
        const updateUser = await ctx.db.search?.create({
          data: {
            userId: userId,
            name: input.searchName,
            title: input.title,
            location: input.location,
            company: input.company,
            jobDescription: input.jobDescription,
            salary: input.salary,
          },
        });
        return updateUser;
      }
    }),



  // SAVED SEARCHES
  getSearches: privateProcedure.query(async ({ ctx }) => {
      const userId = ctx.userId;

      if (userId) {
        const userSearches = await ctx.db.search?.findMany({
          where: {
            userId: userId,
          },
        });
        return userSearches;
      }
    }),


});
