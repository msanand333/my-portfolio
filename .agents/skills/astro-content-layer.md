---
description: Guide for Astro 5 Content Layer API (for Markdown/MDX collections)
---

# Astro 5 Content Layer API

This project uses the new Astro 5 Content Layer API. DO NOT use the legacy `type: 'content'` approach.

## 1. Configuration (`src/content.config.ts`)

Always use `defineCollection` with a `loader`:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Use glob loader for local markdown files
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  // Use astro/zod for schema definitions
  schema: z.object({
    title: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## 2. Querying Content

Use `getCollection` to fetch items.
**Crucial:** Filter out drafts automatically in production via `import.meta.env.PROD`.

```ts
import { getCollection } from "astro:content";

const posts = await getCollection("blog", ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
```

## 3. Rendering MDX

Astro 5 changed how MDX is rendered. You must use the `render()` helper from `astro:content`.

```astro
---
import { getCollection, render } from 'astro:content';

const posts = await getCollection('blog');
const post = posts[0];

// Correct Astro 5 way:
const { Content } = await render(post);
// Deprecated Astro 4 way: await post.render()
---

<article>
  <h1>{post.data.title}</h1>
  <!-- Render the body -->
  <Content />
</article>
```

## 4. Route Generation (`getStaticPaths`)

When generating dynamic routes from collections, the slug property is now `id`:

```ts
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    // Use entry.id, NOT entry.slug
    params: { id: post.id },
    props: { post },
  }));
}
```
