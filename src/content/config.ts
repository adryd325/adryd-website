import { defineCollection, z } from "astro:content";
import type { date } from "astro:schema";

const pages = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { pages };

export const extraPages = [
  {
    slug: "cat-like-typing",
    data: {
      noRss: true,
      title: "Cat like typing detection",
      date: new Date("2024-07-21"),
      updatedDate: null,
    },
  },
  {
    slug: "twitter-embeds",
    data: {
      title: "Twitter Embeds Bot",
      date: new Date("2023-07-02"),
    },
  },
  {
    slug: "trains",
    data: {
      title: "Trains",
      date: new Date("2024-01-01"),
    },
  },
  {
    slug: "ttc-radio-zones",
    data: {
      title: "TTC Radio Underground Zones",
      date: new Date("2025-03-11"),
      updatedDate: new Date("2025-08-07"),
    },
  },
];
