"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import SelectCategory from "@/components/blog/SelectCategory";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChainModifiers, EntryFields, Entry } from "contentful";

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

export default function Page({
  blogs,
}: {
  blogs: Entry<BlogPostType, ChainModifiers, string>[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  console.log(blogs[0].fields.slug);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setBlogsPerPage(9);
    } else {
      setBlogsPerPage(3);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get unique categories from contentful, adding "All" as a category
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.fields.categoryTag.toString())),
  ];

  // Filter blogData based on the search query and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.fields.categoryTag.toString() === selectedCategory;
    return matchesCategory;
  });

  // Calculate the index of the first and last blog on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  // Slice the filtered blogData to show only the blogs for the current page
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="bg-gray-500 h-120 rounded-4xl mb-8" />
      <div className="flex flex-row justify-center">
        <div className="hidden">Category selection</div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:gap-32 w-full">
            {/* Category Selector */}
            <SelectCategory
              categories={categories}
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 w-full">
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
              <ChevronLeftIcon className="h-4" />
            </button>

            {/* Display page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 py-2 mx-2 rounded-md ${
                  currentPage === index + 1
                    ? "text-black font-bold"
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
              <ChevronRightIcon className="h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
