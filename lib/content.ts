import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

const serviceFrontmatter = z.object({
  slug: z.string(),
  number: z.string(),
  category: z.string(),
  title: z.string(),
  summary: z.string(),
  bullets: z.array(z.string()),
  order: z.number(),
});

const workFrontmatter = z.object({
  slug: z.string(),
  client: z.string(),
  title: z.string(),
  summary: z.string(),
  results: z.array(z.object({ value: z.string(), label: z.string() })),
  order: z.number(),
});

const newsroomFrontmatter = z.object({
  slug: z.string(),
  tag: z.string(),
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  order: z.number(),
});

export type Service = z.infer<typeof serviceFrontmatter> & { body: string };
export type WorkCase = z.infer<typeof workFrontmatter> & { body: string };
export type NewsroomPost = z.infer<typeof newsroomFrontmatter> & {
  body: string;
};

function readCollection<T extends { order: number }>(
  collection: string,
  schema: z.ZodType<T>,
): (T & { body: string })[] {
  const dir = path.join(CONTENT_DIR, collection);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.parse(data);
    return { ...parsed, body: content.trim() };
  });

  return items.sort((a, b) => a.order - b.order);
}

export function getServices(): Service[] {
  return readCollection("services", serviceFrontmatter);
}

export function getService(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getWork(): WorkCase[] {
  return readCollection("work", workFrontmatter);
}

export function getWorkCase(slug: string): WorkCase | undefined {
  return getWork().find((item) => item.slug === slug);
}

export function getNewsroomPosts(): NewsroomPost[] {
  return readCollection("newsroom", newsroomFrontmatter);
}

export function getNewsroomPost(slug: string): NewsroomPost | undefined {
  return getNewsroomPosts().find((post) => post.slug === slug);
}
