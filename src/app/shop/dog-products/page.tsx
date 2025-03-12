"use client";

import FilterTab from '@/components/shop/FilterTab';
import SortDropDown from '@/components/shop/SortDropDown';
import Tabs from '@/components/common/Tabs'
import React, { useEffect, useState } from 'react'
import ItemsGrid from '@/components/shop/ItemsGrid';
import useQueryParams from '@/hooks/useQueryParams';

export default function page() {
    const { getQueryParam, setQueryParam } = useQueryParams();

    //TODO these should be fetched from shopify
    const TABS = ['Treats', "Care Products", "Accessories"]
    const [selectedTab, setSelectedTab] = useState(getQueryParam("tab") || TABS[0])

    //TODO these should be fetched from shopify
    const FILTERS = [
        "All",
        "Dry",
        "Crunchy",
        "Wet",
        "Soft & Chewy",
        "Freeze Dried"
    ]
    const [selectedFilter, setSelectedFilter] = useState(getQueryParam("filter") || FILTERS[0])

    const SORTING_OPTIONS = [
        "New Arrivals",
        "Best Selling",
        "On Sale",
        "In Stock",
        "Price: Low to High",
        "Price: High to Low",
    ]
    const [selectedSortingOption, setSelectedSortingOption] = useState(getQueryParam("sort") || SORTING_OPTIONS[0])

    useEffect(() => {
        setQueryParam("tab", selectedTab)
    }, [selectedTab])

    useEffect(() => {
        setQueryParam("filter", selectedFilter)
    }, [selectedFilter])

    useEffect(() => {
        setQueryParam("sort", selectedSortingOption)
    }, [selectedSortingOption])

    return (
        <div className='mt-36 w-full max-w-7xl flex flex-col pb-16'>
            <div className='flex flex-row justify-between'>
                <div>
                    <h2>Shop Dog Products</h2>
                    <div className='mt-4 bodyMD'>Showing all dog products</div>
                </div>
                <div className='bg-amber-500 w-12 h-12' />
            </div>
            <Tabs tabs={TABS} selectedTab={selectedTab} onChange={setSelectedTab} className="w-fit self-center mt-10 bg-gray-200" />
            <SortDropDown className="mt-4" options={SORTING_OPTIONS} selectedOption={selectedSortingOption} onChange={setSelectedSortingOption} />
            <div className='mt-10 flex flex-row gap-12'>
                <FilterTab filters={FILTERS} selectedFilter={selectedFilter} onChange={setSelectedFilter} />
                <ItemsGrid />
            </div>
        </div>
    )
}
