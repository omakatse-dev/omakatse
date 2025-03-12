"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import ProductTabs from '../common/ProductTabs'
import ColorTabs from '../common/ColorTabs'

export default function ProductDetails({ productID }: {
  productID: String
}) {

  const [selectedTab, setSelectedTab] = useState("Option One");
  const [selectedColor, setSelectedColor] = useState("40AED7");


  return (
    <div className="px-12 pt-10 pb-20">

      <div className="flex bodyButton gap-4">
        <Link href ="/">Home</Link>
        <b>/</b>
        <Link href ="/shop/cat-products">All Products</Link>
      </div>

    </div>
  )
}
