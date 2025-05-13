'use client';
import React, { useState, useEffect } from 'react';
import BlogCard from '../blog/BlogCard';
import Button from '../common/Button';
import Link from 'next/link';
import { getAllBlogPosts } from '@/utils/contentfulAPI';
import { ChainModifiers, Entry } from 'contentful';
import { BlogPostType } from '@/types/Types';

function Blog() {
  const [currentBlogs, setCurrentBlogs] = useState<
    Entry<BlogPostType, ChainModifiers, string>[]
  >([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogPosts();
      const firstThree = res.items.slice(0, 3) as Entry<
        BlogPostType,
        ChainModifiers,
        string
      >[];
      setCurrentBlogs(firstThree);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="justify-items-center bg-gray-50">
      <div className="flex w-full max-w-screen-2xl flex-col gap-8 px-6 py-10 lg:gap-15 lg:px-12 lg:py-20">
        <h2 className="text-primary text-center">Omakatse&apos;s blog</h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.fields.blogId.toString()} blog={blog} />
            ))}
            {currentBlogs.length === 0 && <div>No blogs found</div>}
          </div>
        </div>

        <Link className="w-full lg:w-fit lg:self-center" href="/blog" passHref>
          <Button variant="primary">
            View more blogs
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
