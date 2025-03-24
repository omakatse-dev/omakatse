/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { EntryFields } from "contentful";
import { getBlogBySlug } from "../../../utils/contentfulAPI";
import Tag from "@/components/common/Tag";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Asset } from "contentful";

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

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="bodyMD">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h4>{children}</h4>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <div className="bodyLG">{children}</div>
    ),
    [BLOCKS.QUOTE]: (_: any, children: React.ReactNode) => (
      <div className="flex justify-center p-6 bg-white rounded-xl drop-shadow-[4px_4px_0px_rgba(228,223,209,1)] w-full">
        <div className="bodyMD">{children}</div>
      </div>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
      <ol className="list-decimal ml-4">{children}</ol>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      console.log("NODE:", node);
      return (
        <div className="flex flex-col gap-2 items-center py-8">
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            alt="Description Image"
            width={400}
            height={100}
            className="rounded-xl self-center"
          />
          <div className="bodyMD">
            Source:
            <Link
              href={`https:${node.data.target.fields.file.url}`}
              className="ml-1 underline text-blue-500"
            >
              {node.data.target.fields.title.toString()}
            </Link>
          </div>
        </div>
      );
    },
  },
};

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);
  console.log(blog);

  if (!blog) {
    return <div className="text-center mt-32">Blog post not found</div>;
  }

  const imageHeader = (blog.fields.imageHeader as unknown as Asset).fields.file
    ?.url;
  const imageTitle = (blog?.fields.imageHeader as unknown as Asset).fields
    .title;
  const description = blog.fields.description as unknown as Document;

  return (
    <div className="flex flex-col mt-32 w-full px-8 py-2 gap-8 md:px-64">
      {/* Back button for mobile */}
      <Link href="/blog">
        <div className="inline-flex items-center py-2 cursor-pointer font-semibold md:hidden">
          <ChevronLeftIcon className="h-6 w-6 mr-2" />
          Go back
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <Tag className="w-fit">{blog.fields.categoryTag.toString()}</Tag>
        <h2>{blog.fields.title.toString()}</h2>
        <div>
          <div className="flex flex-row gap-2">
            <p className="bodySM text-gray-800">
              Edited:{" "}
              {dayjs(blog.fields.editedDate.toString()).format("MMM D, YYYY")}
            </p>
            <p className="text-gray-200">|</p>
            <p className="bodySM text-gray-800">
              Posted:{" "}
              {dayjs(blog.fields.postedDate.toString()).format("MMM D, YYYY")}
            </p>
            <p className="text-gray-200">|</p>
            <p className="bodySM text-gray-800">
              {blog.fields.readDuration.toString()} mins read
            </p>
          </div>
          <p className="bodySM text-gray-800 font-semibold">
            Written by {blog.fields.author.toString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Image
          src={`https:${imageHeader}`}
          alt="Header Image"
          width={400}
          height={100}
          className="rounded-xl"
        />
        <div className="bodyMD">
          Source:
          <Link
            href={`https:${imageHeader}`}
            className="ml-1 underline text-blue-500"
          >
            {imageTitle?.toString()}
          </Link>
        </div>
      </div>
      {documentToReactComponents(description, options)}
      <div></div>
    </div>
  );
}
