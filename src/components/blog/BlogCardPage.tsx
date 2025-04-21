"use client";

import React, { useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import SelectCategory from "@/components/blog/SelectCategory";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChainModifiers, Entry } from "contentful";
import Image from "next/image";
import { BlogPostType } from "@/types/Types";

export default function Page({
  blogs,
}: {
  blogs: Entry<BlogPostType, ChainModifiers, string>[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.fields.categoryTag.toString())),
  ];
  const blogsPerPage = 9;
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.fields.categoryTag.toString() === selectedCategory;
    return matchesCategory;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Image
          src="/assets/OmakatseBlog.svg"
          alt="Blog Image"
          width={1340}
          height={190}
          className="rounded-3xl mb-8 sm:h-100 object-cover w-full"
        />
        <div className="absolute top-1/2 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl lg:text-7xl font-bold w-full text-center ">
          Omakatse&apos;s Blog
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="hidden">Category selection</div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:gap-32 w-full">
            {/* Category Selector */}
            <div className="sticky top-28">
              <SelectCategory
                categories={categories}
                onCategorySelect={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.fields.blogId.toString()} blog={blog} />
              ))}
              {currentBlogs.length === 0 && <div>no blogs found</div>}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 mb-10 md:mb-15">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2"
            >
              <ChevronLeftIcon
                className={`h-4 ${
                  currentPage === 1 ? "text-gray-200" : "text-primary"
                }`}
              />
            </button>

            {/* Display page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 py-2 mx-2 rounded-md ${
                  currentPage === index + 1
                    ? "text-primary font-bold"
                    : "text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2"
            >
              <ChevronRightIcon
                className={`h-4 ${
                  currentPage === totalPages ? "text-gray-200" : "text-primary"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
