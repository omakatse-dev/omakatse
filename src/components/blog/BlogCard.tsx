import React from "react";
import Tag from "../common/Tag";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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

interface BlogCardProps {
  blog: Entry<BlogPostType>;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  if (!blog || !blog.fields) return null;
  return (
    <div className="rounded-xl border-1 border-gray-400 flex flex-col p-8">
      <div className="flex flex-row gap-4 mb-4">
        <Tag>{blog.fields.categoryTag.toString()}</Tag>
        <p className="bodySM text-gray-500 flex items-center">
          {blog.fields.readDuration.toString()} min read
        </p>
      </div>
      <h4 className="mb-2">{blog.fields.title.toString()}</h4>
      <p className="bodyMD mb-6 line-clamp-3 ">{blog.fields.summary.toString()}</p>
      <div>
        <Link href={`/blog/${blog.fields.slug}`} passHref>
          <div className="inline-flex flex-row gap-2 items-center cursor-pointer bodyButton">
            Read more
            <ChevronRightIcon className="h-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
