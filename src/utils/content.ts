import { getCollection } from "astro:content";

export async function getPublishedExperience() {
  const entries = await getCollection("experience", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects() {
  return getCollection(
    "projects",
    ({ data }) => (import.meta.env.PROD ? !data.draft : true) && data.featured,
  );
}

export async function getAllProjects() {
  const entries = await getCollection("projects", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedPosts() {
  const entries = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
}
