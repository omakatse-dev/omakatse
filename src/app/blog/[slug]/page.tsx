/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getBlogBySlug } from '../../../utils/contentfulAPI';
import Tag from '@/components/common/Tag';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS } from '@contentful/rich-text-types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Asset } from 'contentful';
import ScrollProgressCircle from '@/components/common/ScrollProgressCircle';
import ScrollUpButton from '@/components/common/ScrollUpButton';
import MoreBlogsSection from '@/components/blog/MoreBlogsSection';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="bodyMD mb-8 text-gray-800">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h4 className="text-primary mb-6">{children}</h4>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <div className="bodyLG text-primary mb-3">{children}</div>
    ),
    [BLOCKS.QUOTE]: (_: any, children: React.ReactNode) => (
      <div className="mb-8 flex items-center justify-center rounded-xl bg-white px-8 pt-8 drop-shadow-[4px_4px_0px_rgba(228,223,209,1)] md:rounded-[1.25rem]">
        <div className="bodyMD text-primary">{children}</div>
      </div>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
      <ol className="ml-4 list-decimal">{children}</ol>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <div className="flex w-fit flex-col items-center gap-2 self-center py-8">
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            alt="Description Image"
            width={400}
            height={100}
            className="self-center rounded-xl"
          />
          {node.data.target.fields.description && (
            <div className="bodyMD self-start">
              Source:
              <Link
                href={node.data.target.fields.description.toString()}
                className="ml-1 text-[#40AED7] underline"
              >
                {node.data.target.fields.title.toString()}
              </Link>
            </div>
          )}
        </div>
      );
    }
  }
};

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams; // Check if preview mode is enabled

  const blog = await getBlogBySlug(slug, preview);

  if (!blog) {
    return (
      <div className="text-primary mt-32 text-center">Blog post not found</div>
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
    <div className="flex w-full flex-col">
      <div className="mt-28 flex w-full max-w-7xl flex-col gap-4 self-center px-8 md:px-64">
        {/* Back button for mobile */}
        <Link href="/blog">
          <div className="inline-flex cursor-pointer items-center py-2 font-semibold md:hidden">
            <ChevronLeftIcon className="mr-2 h-6 w-6" />
            Go back
          </div>
        </Link>

        <ScrollProgressCircle />

        <div className="flex flex-col gap-3">
          <Tag className="w-fit">{blog.fields.categoryTag?.toString()}</Tag>
          <h2 className="text-primary">{blog.fields.title?.toString()}</h2>
          <div className="flex flex-row gap-2">
            <p className="bodySM text-gray-800">
              Edited:{' '}
              {dayjs(blog.fields.editedDate?.toString()).format('MMM D, YYYY')}
            </p>
            <div className="inline-block w-0.5 bg-gray-200"></div>
            <p className="bodySM text-gray-800">
              Posted:{' '}
              {dayjs(blog.fields.postedDate?.toString()).format('MMM D, YYYY')}
            </p>
            <div className="inline-block w-0.5 bg-gray-200"></div>
            <p className="bodySM text-gray-800">
              {blog.fields.readDuration?.toString()} mins read
            </p>
          </div>
          <p className="bodySM mt-1 font-semibold text-gray-800">
            Written by {blog.fields.author?.toString()}
          </p>
        </div>

        <div className="flex w-fit flex-col items-center gap-2 self-center">
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
                className="ml-1 text-[#40AED7] underline"
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
      <ScrollUpButton className="fixed right-10 bottom-6" />
    </div>
  );
}
