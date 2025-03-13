import { ProductSearchResultType } from '@/types/Types'
import Link from 'next/link'
import React from 'react'

export default function ProductSearchResult({ product }: { product: ProductSearchResultType }) {

  const id = product.id.split('/').pop();

  return (
    <Link href={`/shop/${id}`} className='flex w-full gap-5 py-4'>
      <img src={product.featuredImage.url} className='w-16 aspect-square object-cover' />
      <div className='flex flex-col w-full justify-between'>
        <div className='font-semibold bodyMD'>{product.title}</div>
        <div className='bodySM text-gray-800'>{product.priceRange.minVariantPrice.amount}</div>
      </div>
    </Link>
  )
}
