import { z } from "zod";

export const ZodFrontmatter = z.object({
  title: z.string().min(2).max(60),
  description: z.string().min(2).max(280),
  date: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
});

export type Frontmatter = {
  title: string,
  description: string,
  date?: Date,
  updatedDate?: Date,
  coverImage?: ImageMetadata | string,
  coverImageAlt?: string,
};

export const ZodPagesFrontmatter = z.object({
  title: z.string().min(2).max(60),
  description: z.string().min(2).max(280),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  unlisted: z.boolean().default(false).optional(),
  unlistedRss: z.boolean().default(false).optional(),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
});

export type PagesFrontmatter = {
  title: string,
  description: string,
  date: Date,
  updatedDate?: Date,
  unlisted?: boolean,
  unlistedRss?: boolean,
  coverImage?: ImageMetadata | string,
  coverImageAlt?: string,
}

const slugRegexp = /^\.\/pages\/pages\/(.+)\/_?index\.(astro|md|mdx|json)$/;
function slugFromPath(path: string): string | undefined {
  let match = path.match(slugRegexp);
  if (match && match.length > 1) {
    return match[1];
  }
}

export function getPages() {
  const files = import.meta.glob("./pages/pages/*/index.*", { eager: true });
  const json = import.meta.glob("./pages/pages/*/_index.*", { eager: true });
  const entries = Object.entries(files);
  entries.push(...Object.entries(json));
  const slugs: string[] = [];
  const metadata: {
    frontmatter: PagesFrontmatter;
    url: string;
    slug: string;
  }[] = [];
  for (let index = 0; index < entries.length; index++) {
    const [path, file] = entries[index] as [string, { frontmatter?: unknown }];

    const slug = slugFromPath(path);
    if (!slug) {
      console.log(path);
      continue;
    }
    if (slugs.includes(slug)) {
      throw new Error(`Duplicate slugs for ${path}: ${slug}`);
    }
    slugs.push(slug);

    if (!file || typeof file != "object") {
      throw new Error(`File has no content ${path}`);
    }
    if (!file.frontmatter) {
      throw new Error(`File "${slug}" doesn't export frontmatter`);
    }
    let frontmatter;
    try {
      frontmatter = ZodPagesFrontmatter.parse(file.frontmatter);
    } catch (e) {
      throw new Error(`Typechecking frontmatter metadata for ${path} failed`, {
        cause: e,
      });
    }
    metadata.push({ slug, frontmatter, url: "/pages/" + slug + "/" });
  }
  return metadata.sort(
    (a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime()
  );
}
