import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Button from '../common/Button'

function Blog() {
  return (
    <div className="bg-gray-50 px-6 lg:px-12 py-10 lg:py-20 flex flex-col gap-8 lg:gap-15">
      <h2 className="text-center">Omakatse&apos;s blog</h2>

    <div className="flex flex-col lg:flex-row  lg:justify-between gap-8">
      <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
        <div className="mb-4 flex gap-4">
          <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
            Category
          </div>
          <div className="bodySM text-gray-500 items-center inline-flex">
            5 min read
          </div>
        </div>
        <h4 className="mb-2">Blog title heading</h4>
        <div className="bodyMD mb-8">Blog desription will go here</div>
        <button className="bodyButton w-full flex gap-2">
          View more blogs
          <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
        </button>
      </div>
      <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
        <div className="mb-4 flex gap-4">
          <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
            Category
          </div>
          <div className="bodySM text-gray-500 items-center inline-flex">
            5 min read
          </div>
        </div>
        <h4 className="mb-2">Blog title heading</h4>
        <div className="bodyMD mb-8">Blog desription will go here</div>
        <button className="bodyButton w-full flex gap-2">
          View more blogs
          <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
        </button>
      </div>
      <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
        <div className="mb-4 flex gap-4">
          <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
            Category
          </div>
          <div className="bodySM text-gray-500 items-center inline-flex">
            5 min read
          </div>
        </div>
        <h4 className="mb-2">Blog title heading</h4>
        <div className="bodyMD mb-8">Blog desription will go here</div>
        <button className="bodyButton w-full flex gap-2">
          View more blogs
          <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
        </button>
      </div>
    </div>
    <Button
      variant="primary"
      className="w-full lg:w-fit lg:justify-self-center"
    >
      View more blogs
    </Button>
  </div>
  )
}

export default Blog
