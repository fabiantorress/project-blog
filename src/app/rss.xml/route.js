import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";

export async function GET() {
  const blogPostList = await getBlogPostList();
  const feed = new RSS({ title: BLOG_TITLE, description: BLOG_DESCRIPTION });
  blogPostList.forEach((blogPost) =>
    feed.item({
      title: blogPost.title,
      description: blogPost.abstract,
      date: blogPost.publishedOn,
      url: `http://some-website.com/${blogPost.slug}`,
    })
  );
  const xml = feed.xml({indent: true});
  return new Response(xml, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/xml",
    },
  });
}
