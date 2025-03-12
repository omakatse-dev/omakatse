"use client"

import React from 'react'
import { useState } from 'react'
import ProductTabs from '../common/ProductTabs'

export default function ProductDetails({ productID }: {
  productID: String
}) {

  const [selectedTab, setSelectedTab] = useState("Small Box");

  return (
    <div>
      {productID}
      <ProductTabs
        tabs={["Option one", "Option two", "Option three"]}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
        className=""
      />
    </div>
  )
}
