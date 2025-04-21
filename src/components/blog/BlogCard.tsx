import React from "react";
import Tag from "../common/Tag";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Entry } from "contentful";
import { BlogPostType } from "@/types/Types";

interface BlogCardProps {
  blog: Entry<BlogPostType>;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  if (!blog || !blog.fields) return null;
  return (
    <Link href={`/blog/${blog.fields.slug}`} passHref>
      <div className="rounded-xl md:rounded-[1.25rem] border-1 border-gray-400 flex flex-col p-6 md:p-8 h-full">
        <div className="flex flex-row gap-4 mb-4">
          <Tag>{blog.fields.categoryTag.toString()}</Tag>
          <p className="bodySM text-gray-500 flex items-center">
            {blog.fields.readDuration.toString()} min read
          </p>
        </div>
        <h4 className="mb-2 text-primary line-clamp-3">{blog.fields.title.toString()}</h4>
        <p className="bodyMD mb-6 line-clamp-3 text-gray-800">
          {blog.fields.summary.toString()}
        </p>
        <div>
          <div className="inline-flex flex-row gap-2 items-center cursor-pointer bodyButton text-primary">
            Read more
            <ChevronRightIcon className="h-6" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
