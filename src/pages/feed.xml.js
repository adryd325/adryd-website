import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { extraPages } from "../content/config";

export async function GET(context) {
  const pages = await getCollection("pages").then((posts) =>
    posts
      .filter((a) => a.data.draft != true)
      .map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/pages/${post.slug}/`,
      }))
  );
  const processedExtraPages = extraPages.filter((a) => a.data.draft != true).filter((a) => a.data.noRss != true)
    .map((post) => ({
      ...post.data,
      pubDate: post.data.date,
      link: `/pages/${post.slug}/`,
    }))

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [...pages, ...processedExtraPages],
  });
}
