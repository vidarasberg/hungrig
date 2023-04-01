import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const recipesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipe.findMany();
    return recipes;
  }),

  getAllByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: { authorId: input.userId },
      });
      return recipes;
    }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        link: z.string().min(1).max(255).url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser;

      const recipe = await ctx.prisma.recipe.create({
        data: { authorId, ...input },
      });

      return recipe;
    }),
});
