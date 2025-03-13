import React from 'react'

export default function ProductTitle({ productID }: {
  productID: String,
}) {

    return (
    <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-1/8">
            <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
            <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
            <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
            <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
        </div>
        <div className="bg-gray-500 rounded-xl w-7/8 aspect-square"/>
    </div>
    )}