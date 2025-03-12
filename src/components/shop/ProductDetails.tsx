"use client"

import React from 'react'
import { useState } from 'react'
import ProductTabs from '../common/ProductTabs'
import ColorTabs from '../common/ColorTabs'

export default function ProductDetails({ productID }: {
  productID: String
}) {

  const [selectedTab, setSelectedTab] = useState("Small Box");
  const [selectedColor, setSelectedColor] = useState("40AED7");


  return (
    <div>
      {productID}
      <ProductTabs
        tabs={["Option one", "Option two", "Option three"]}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
        className=""
      />
      <ColorTabs
        tabs={["40AED7", "EE807F"]}
        selectedTab={selectedColor}
        onChange={setSelectedColor}
        className=""
      />
    </div>
  )
}
