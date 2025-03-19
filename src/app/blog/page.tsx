"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import SelectCategory from "@/components/blog/SelectCategory";
import blogData from "./blogData.json"; // Your blog data import
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [blogsPerPage, setBlogsPerPage] = useState(3); // Default to 3 for small screens
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // State for selected category

  useEffect(() => {
    // Set the isClient flag to true once the component is mounted
    setIsClient(true);

    // Set blogsPerPage based on the window width
    if (window.innerWidth >= 768) {
      setBlogsPerPage(9);
    } else {
      setBlogsPerPage(3);
    }
  }, []); // This runs only once when the component mounts

  // If we're still on the server, don't render anything
  if (!isClient) {
    return null;
  }

  // Get unique categories from blogData, adding "All" as a category
  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  // Filter blogData based on the search query and selected category
  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearchQuery = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  // Calculate the index of the first and last blog on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  // Slice the filtered blogData to show only the blogs for the current page
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-screen mt-32 md:mt-42 mx-8 md:mx-20">
      <div className="bg-gray-500 h-120 rounded-4xl mb-8" />
      <div className="flex flex-row justify-center">
        <div className="hidden">Category selection</div>
        <div className="">
          {/* Search Bar */}
          <div className="flex flex-row justify-center">
            <div className="hidden md:flex mb-8 w-80 rounded-full bg-white items-center p-2 border-gray-200 border-1 h-auto">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search for blog"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 w-full outline-none"
              />
              <MagnifyingGlassIcon className="h-6 mx-2" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-32">
            {/* Category Selector */}
            <SelectCategory
              categories={categories}
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blogData={blog} />
              ))}
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
