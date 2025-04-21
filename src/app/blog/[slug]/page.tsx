/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getBlogBySlug } from "../../../utils/contentfulAPI";
import Tag from "@/components/common/Tag";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Asset } from "contentful";
import ScrollProgressCircle from "@/components/common/ScrollProgressCircle";
import ScrollUpButton from "@/components/common/ScrollUpButton";
import MoreBlogsSection from "@/components/blog/MoreBlogsSection";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="bodyMD text-gray-800 mb-8">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h4 className="text-primary mb-6">{children}</h4>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <div className="bodyLG text-primary mb-3">{children}</div>
    ),
    [BLOCKS.QUOTE]: (_: any, children: React.ReactNode) => (
      <div className="flex justify-center items-center pt-8 px-8 bg-white rounded-xl md:rounded-[1.25rem] drop-shadow-[4px_4px_0px_rgba(228,223,209,1)] mb-8">
        <div className="bodyMD text-primary">{children}</div>
      </div>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
      <ol className="list-decimal ml-4">{children}</ol>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <div className="flex flex-col gap-2 items-center py-8 w-fit self-center">
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            alt="Description Image"
            width={400}
            height={100}
            className="rounded-xl self-center"
          />
          {node.data.target.fields.description && (
            <div className="bodyMD self-start">
              Source:
              <Link
                href={node.data.target.fields.description.toString()}
                className="ml-1 underline text-[#40AED7]"
              >
                {node.data.target.fields.title.toString()}
              </Link>
            </div>
          )}
        </div>
      );
    },
  },
};

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams; // Check if preview mode is enabled

  const blog = await getBlogBySlug(slug, preview);

  if (!blog) {
    return (
      <div className="text-center mt-32 text-primary">Blog post not found</div>
    );
  }

  const imageHeader = (blog.fields.imageHeader as unknown as Asset).fields.file
    ?.url;
  const imageHeaderTitle = (blog?.fields.imageHeader as unknown as Asset).fields
    .title;
  const imageHeaderDescription = (blog?.fields.imageHeader as unknown as Asset)
    .fields.description;
  const description = blog.fields.description as unknown as Document;

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col mt-28 w-full px-8 gap-4 md:px-64 max-w-7xl self-center">
        {/* Back button for mobile */}
        <Link href="/blog">
          <div className="inline-flex items-center py-2 cursor-pointer font-semibold md:hidden">
            <ChevronLeftIcon className="h-6 w-6 mr-2" />
            Go back
          </div>
        </Link>

        <ScrollProgressCircle />

        <div className="flex flex-col gap-3  ">
          <Tag className="w-fit">{blog.fields.categoryTag?.toString()}</Tag>
          <h2>{blog.fields.title?.toString()}</h2>
            <div className="flex flex-row gap-2">
              <p className="bodySM text-gray-800">
                Edited:{" "}
                {dayjs(blog.fields.editedDate?.toString()).format(
                  "MMM D, YYYY"
                )}
              </p>
              <div className="inline-block w-0.5 bg-gray-200"></div>
              <p className="bodySM text-gray-800">
                Posted:{" "}
                {dayjs(blog.fields.postedDate?.toString()).format(
                  "MMM D, YYYY"
                )}
              </p>
              <div className="inline-block w-0.5 bg-gray-200"></div>
              <p className="bodySM text-gray-800">
                {blog.fields.readDuration?.toString()} mins read
              </p>
            </div>
            <p className="bodySM text-gray-800 font-semibold mt-1">
              Written by {blog.fields.author?.toString()}
            </p>
        </div>

        <div className="flex flex-col gap-2 items-center w-fit self-center">
          <Image
            src={`https:${imageHeader}`}
            alt="Header Image"
            width={400}
            height={100}
            className="rounded-xl"
          />
          {imageHeaderDescription && (
            <div className="bodyMD self-start">
              Source:
              <Link
                href={imageHeaderDescription.toString()}
                className="ml-1 underline text-[#40AED7]"
              >
                {imageHeaderTitle?.toString()}
              </Link>
            </div>
          )}
        </div>
        <div className="mb-32">
          {documentToReactComponents(description, options)}
        </div>
      </div>
      <MoreBlogsSection currentBlogId={blog.fields.blogId.toString()} />
      <ScrollUpButton className="fixed bottom-6 right-10" />
    </div>
  );
}
