import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.string(),
    index: z.number(),
  }),
});

export const collections = {
  blog: blogCollection,
};
