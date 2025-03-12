import React from 'react'
import ItemCard from './ItemCard'
import { ShopfrontProduct } from '@/types/Types'

export default function ItemsGrid({ products }: { products: ShopfrontProduct[] }) {
    return (
        <div className='grid grid-cols-3 w-full gap-y-16 gap-x-8'>
            {products.map((product) => (
                <ItemCard key={product.id} product={product} />
            ))}
        </div>
    )
}
