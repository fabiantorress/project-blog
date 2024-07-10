import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers-test";
import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION
};

async function Home() {
  const blogPostList = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPostList.map((blogPost) => (
        <BlogSummaryCard
          key={blogPost.slug}
          slug={blogPost.slug}
          title={blogPost.title}
          abstract={blogPost.abstract}
          publishedOn={blogPost.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
