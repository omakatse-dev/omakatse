import React from 'react';
import Tag from '../common/Tag';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface BlogCardProps {
  blogData: {
    id: string;
    category: string;
    duration: string;
    title: string;
    description: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blogData }) => {
  return (
    <div className="rounded-xl border-1 border-gray-400 flex flex-col p-8">
      <div className="flex flex-row gap-4 mb-4">
        <Tag>{blogData.category}</Tag>
        <p className="bodySM text-gray-500 flex items-center">{blogData.duration} min read</p>
      </div>
      <h4 className="mb-2">{blogData.title}</h4>
      <p className="bodyMD mb-6">{blogData.description}</p>
      <div>
        <Link href={`/blog/${blogData.id}`} passHref>
          <button className="flex flex-row gap-2 items-center">
            <p className="bodyButton">Read more</p>
            <ChevronRightIcon className="h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;