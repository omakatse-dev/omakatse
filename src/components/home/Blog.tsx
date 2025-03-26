"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "../blog/BlogCard";
import Button from "../common/Button";
import Link from "next/link";
import { getAllBlogPosts } from "@/utils/contentfulAPI";
import { EntryFields, Entry } from "contentful";

export type BlogPostType = {
  contentTypeId: "blogPost";
  fields: {
    blogId: EntryFields.Integer;
    categoryTag: EntryFields.Symbol;
    title: EntryFields.Text;
    editedDate: EntryFields.Date;
    postedDate: EntryFields.Date;
    readDuration: EntryFields.Integer;
    author: EntryFields.Text;
    imageHeader: EntryFields.AssetLink;
    description: EntryFields.RichText;
    summary: EntryFields.Text;
    slug: EntryFields.Text;
  };
};

function Blog() {
  const [currentBlogs, setCurrentBlogs] = useState<Entry<BlogPostType>[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogPosts();
      const firstThree = res.items.slice(0, 3);
      setCurrentBlogs(firstThree);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 px-6 lg:px-12 py-10 lg:py-20 flex flex-col gap-8 lg:gap-15">
      <h2 className="text-center">Omakatse&apos;s blog</h2>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.fields.blogId.toString()} blog={blog} />
          ))}
          {currentBlogs.length === 0 && <div>No blogs found</div>}
        </div>
      </div>

      <Button variant="primary" className="w-full lg:w-fit lg:self-center">
        <Link href="/blog" passHref>
          View more blogs
        </Link>
      </Button>
    </div>
  );
}

export default Blog;
