"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import ProductTitle from './ProductPage/ProductTitle'
import Image from 'next/image'


export default function ProductDetails({ productID }: {
  productID: String
}) {

  return (
    <div className="flex flex-col px-12 pt-10 pb-20 w-screen bg-green-200">

      <div className="flex bodyButton gap-4 self-start">
        <Link href ="/">Home</Link>
        <b>/</b>
        <Link href ="/shop/cat-products">All Products</Link>
      </div>

      <div className="pt-10 pb-15 flex flex-row gap-25 w-full">

        <div className="flex flex-col gap-15 w-1/2 bg-blue-200">
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col gap-5 w-1/8">
              <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
              <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
              <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
              <div className="bg-gray-500 aspect-square rounded-xl w-full"/>
            </div>
            <div className="bg-gray-500 rounded-xl w-7/8 aspect-square"/>
          </div>
          <div>
            <div className="bodyLG">Description</div>
          </div>
        </div>

        <ProductTitle productID={productID}/>

      </div>

    </div>
  )
}
