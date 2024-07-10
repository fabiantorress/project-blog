import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const CircularColorsDemo = dynamic(() =>
  import("../../components/CircularColorsDemo")
);
const DivisionGroupsDemo = dynamic(() =>
  import("../../components/DivisionGroupsDemo")
);

const getBlogPost = React.cache(async (slug) => {
  return await loadBlogPost(slug);
});
export async function generateMetadata({ params }) {
  const blogPostData = await getBlogPost(params.postSlug);
  if (!blogPostData) {
    return null;
  }

  const { frontmatter } = blogPostData;

  return {
    title: `${frontmatter.title}`,
    description: `${frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await getBlogPost(params.postSlug);
  if (!blogPostData) {
    notFound();
  }
  const { content, frontmatter } = blogPostData;
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ CodeSnippet, CircularColorsDemo, DivisionGroupsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
