import React from 'react'
import Tag from '@/components/common/Tag'
import Image from 'next/image'
import Button from '@/components/common/Button'

// This card will receive boxid or box as prop
export default function PastBoxCard() {
  return (
    <div className="flex flex-col bg-white rounded-xl sm:rounded-[1.25rem] p-6 sm:p-8 items-center">
        <Tag className="mb-3">Delivered</Tag>
        <h4>MMM YYYY</h4>
        <div className="bodyMD mb-3">Box X out of X</div>
        <Image
            src="/assets/box_image.svg"
            alt="Box"
            width={200}
            height={200}
            className="mb-3"
            />
            {/* This Button will pass the boxid as a prop to viewboxdetails component */}
        <Button variant="primary" className="w-full sm:w-fit">
            View Box
        </Button>
    </div>
  )
}

