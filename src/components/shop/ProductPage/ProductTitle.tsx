"use client"

import React from 'react'
import { useState } from 'react'
import Button from '@/components/common/Button'
import Tag from '../../common/Tag'
import Image from 'next/image'
import ProductTabs from '../../common/ProductTabs'
import ColorTabs from '../../common/ColorTabs'
import CounterButton from '@/components/common/CounterButton'

export default function ProductTitle({ className, productID }: {
  productID: String,
  className?: String
}) {

  const [selectedVariant, setSelectedVariant] = useState("Option One");
  const [selectedWeight, setSelectedWeight] = useState("60g");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("#40AED7");


  return (
    <div className={`flex flex-col w-1/2 bg-gray-50 ${className}`}>
            
        <div className="flex flex-row justify-between mb-2">
          <div>
            <Tag children="New" className="bg-yellow mb-2"></Tag>
            <b className="bodyXL text-gray-800 font-normal">FLF</b>
          </div>
            <Image src="/assets/CatIcon.svg" alt="Cat Icon" width={24} height={24} className="bg-white rounded-full aspect-square h-10 w-10 p-2"/>
        </div>

        <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-2">
            <h3 className="font-bold">Domestic vegetables and venison meatballs, variant one, 60g</h3>
            <b className="bodyXL font-normal">AED 55</b>
            <b className="bodySM font-light"> (4.5 stars) 10 reviews</b>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <b className="bodyMD font-normal">Variant</b>
                    <div className="flex flex-row gap-4">
                        <ProductTabs tabs={["Option One", "Option Two", "Option Three"]} selectedTab={selectedVariant} onChange={setSelectedVariant}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <b className="bodyMD font-normal">Weight</b>
                    <div className="flex flex-row gap-4">
                        <ProductTabs tabs={["60g", "100g", "180g"]} selectedTab={selectedWeight} onChange={setSelectedWeight}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <b className="bodyMD font-normal">Size</b>
                    <div className="flex flex-row gap-4">
                        <ProductTabs tabs={["Small", "Medium", "Large"]} selectedTab={selectedSize} onChange={setSelectedSize}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <b className="bodyMD font-normal">Colors</b>
                    <div className="flex flex-row gap-4">
                        <ColorTabs tabs={["#40AED7", "#EE807F"]} selectedTab={selectedColor} onChange={setSelectedColor}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4 w-full">
                <CounterButton/>
                <Button variant="primary" className="">Add to Cart - AED 55</Button>
            </div>

        </div>

    </div>





  )
}
