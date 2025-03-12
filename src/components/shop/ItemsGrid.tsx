import React from 'react'
import ItemCard from './ItemCard'

export default function ItemsGrid() {
    return (
        <div className='grid grid-cols-3 w-full gap-y-16 gap-x-8'>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </div>
    )
}
