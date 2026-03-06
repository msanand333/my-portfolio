import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const experience = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    github: z.string().url(),
    live: z.string().url().optional(),
    stars: z.number().optional(),
    forks: z.number().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { experience, projects, blog };
