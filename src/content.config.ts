import { blogSchema } from "@schemas";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
};
