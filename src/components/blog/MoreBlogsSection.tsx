'use client'; // Required for useState and useEffect

import React, { useState, useEffect } from 'react';
import { getAllBlogPosts } from '@/utils/contentfulAPI';
import BlogCard from './BlogCard';
import { Entry, ChainModifiers } from 'contentful';
import { BlogPostType } from '@/types/Types';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface MoreBlogsSectionProps {
  currentBlogId: string;
}

const MoreBlogsSection: React.FC<MoreBlogsSectionProps> = ({
  currentBlogId
}) => {
  const [moreBlogs, setMoreBlogs] = useState<
    Entry<BlogPostType, ChainModifiers, string>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasOtherBlogs, setHasOtherBlogs] = useState(false);

  useEffect(() => {
    const fetchAndSelectBlogs = async () => {
      setIsLoading(true);
      setHasOtherBlogs(false);
      setMoreBlogs([]);

      try {
        const allBlogPosts = await getAllBlogPosts();
        console.log(allBlogPosts);
        console.log(currentBlogId);
        if (allBlogPosts && allBlogPosts.items) {
          const otherBlogs = allBlogPosts.items.filter(
            (blog) => blog.fields.blogId.toString() !== currentBlogId
          ) as Entry<BlogPostType, ChainModifiers, string>[];

          if (otherBlogs.length > 0) {
            setHasOtherBlogs(true);
            const shuffledBlogs = shuffleArray(otherBlogs);
            const selectedBlogs = shuffledBlogs.slice(0, 3);
            setMoreBlogs(selectedBlogs);
          }
        } else {
          console.warn('No blog posts returned from API.');
        }
      } catch (error) {
        console.error('Error fetching related blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSelectBlogs();
  }, [currentBlogId]);

  return (
    <div className="bg-yellow-pastel flex w-full justify-center px-6 pt-10 pb-16 lg:px-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <h2 className="text-primary mb-8 text-center lg:mb-15">More Blogs</h2>

        {isLoading && (
          <div className="text-center text-gray-500">Loading blogs...</div>
        )}

        {!isLoading && !hasOtherBlogs && (
          <div className="text-center text-gray-500">
            More blogs coming soon!
          </div>
        )}

        {!isLoading && hasOtherBlogs && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {moreBlogs.map((blog) => (
              <BlogCard key={blog.sys.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreBlogsSection;
