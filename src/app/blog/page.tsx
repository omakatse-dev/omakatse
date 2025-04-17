import React from "react";
import BlogPage from "@/components/blog/BlogCardPage";
import { getAllBlogPosts } from "@/utils/contentfulAPI";

export default async function Page() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20 max-w-[120rem]">
      <BlogPage blogs={blogPosts.items} />
    </div>
  );
}
