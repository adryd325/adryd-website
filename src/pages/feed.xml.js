import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getPages } from "../Frontmatter";

export async function GET(context) {
  const pages = getPages()
  const items = pages
    .filter((a) => a.frontmatter.unlisted != true)
    .filter((a) => a.frontmatter.unlistedRss != true)
    .map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.date,
      link: `/pages/${post.slug}/`,
    }))
    
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
