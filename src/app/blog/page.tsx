import React from "react";
import BlogPage from "@/components/blog/BlogCardPage";
import { getAllBlogPosts } from "@/utils/contentfulAPI";

// async function fetchBlogPosts() {
//   const blogPosts: = await getAllBlogPosts();
//   return blogPosts;
// }

export default async function Page() {
  const blogPosts = await getAllBlogPosts();

  // console.log(BlogPosts);
  // console.log(BlogPosts[0].description);
  // console.log(BlogPosts[0].imageHeader);

  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20">
      <BlogPage blogs={blogPosts.items} />
    </div>
  );
}
