import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getBlogPostList() {
  const files = await readDirectory("/content");
  let blogPost = [];
  for (let file of files) {
    const rawContent = await readFile(`/content/${file}`);
    const { data: frontMatter } = matter(rawContent);
    blogPost.push({ slug: file.replace(".mdx", ""), ...frontMatter });
  }
  return blogPost.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf-8");
}

export async function loadBlogPost(slug) {
  const rawContent = await readFile(`/content/${slug}.mdx`);
  const { content, data: frontMatter } = matter(rawContent);
  return { content, frontMatter };
}
