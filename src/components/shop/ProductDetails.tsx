import React from 'react'
import Link from 'next/link'
import ProductTitle from './ProductPage/ProductTitle'
import ProductDescription from './ProductPage/ProductDescription'
import ProductImages from './ProductPage/ProductImages'


export default function ProductDetails({ productID }: {
  productID: String
}) {

  return (
    <div className="flex flex-col px-12 pt-10 pb-20 w-screen h-fit">

      <div className="flex bodyButton gap-4">
        <Link href ="/" className="font-normal">Home</Link>
        <b className="font-normal">/</b>
        <Link href ="/shop/cat-products" className="font-normal">All Products</Link>
      </div>

      <div className="pt-10 pb-15 flex gap-25 w-full">

        <div className="flex flex-col gap-15 w-1/2">
          <ProductImages productID={productID}/>
          <div>
              <ProductDescription productID={productID}/>
          </div>
        </div>

        <ProductTitle className="sticky top-30 h-fit" productID={productID}/>

      </div>

    </div>
  )
}
