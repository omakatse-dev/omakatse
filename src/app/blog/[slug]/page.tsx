import React from 'react';

// interface BlogDetails {
//     id: string;
//     category: string;
//     duration: string;
//     title: string;
//     description: string;
//   }

export default async function BlogPage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
  return (
    <div className="flex justify-center items-center w-full mt-32 p-8 flex-col">
      <h1>This is blog {slug}</h1>
      <div className="bg-gray-600 w-full md:w-1/2 h-80 rounded-4xl" />
    </div>
  );
}
