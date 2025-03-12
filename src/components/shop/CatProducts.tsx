'use client'

import useQueryParams from "@/hooks/useQueryParams";
import { useState, useEffect } from "react";
import Tabs from "../common/Tabs";
import FilterTab from "./FilterTab";
import ItemsGrid from "./ItemsGrid";
import SortDropDown from "./SortDropDown";
import { ShopfrontProduct } from "@/types/Types";

export default function CatProducts({ products, categories }: {
    products: ShopfrontProduct[],
    categories: Record<string, string[]>
}) {
    const { getQueryParam, setQueryParam } = useQueryParams();

    const TABS = Object.keys(categories);
    const [selectedTab, setSelectedTab] = useState(getQueryParam("tab") || TABS[0]);

    const FILTERS = categories[selectedTab as keyof typeof categories];
    const [selectedFilter, setSelectedFilter] = useState(getQueryParam("filter") || FILTERS[0]);

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

    const filteredProducts = products.filter((product) => {
        return product.metafields.find((metafield) => metafield.key === "category")?.value === selectedTab && (product.metafields.find((metafield) => metafield.key === "sub_category")?.value === selectedFilter || selectedFilter === "All")
    })

    return (
        <div className='mt-36 w-full max-w-7xl flex flex-col pb-16'>
            <div className='flex flex-row justify-between'>
                <div>
                    <h2>Shop Cat Products</h2>
                    <div className='mt-4 bodyMD'>Showing all cat products</div>
                </div>
                <div className='bg-amber-500 w-12 h-12' />
            </div>
            <Tabs tabs={TABS} selectedTab={selectedTab} onChange={setSelectedTab} className="w-fit self-center mt-10" />
            <SortDropDown className="mt-4" options={SORTING_OPTIONS} selectedOption={selectedSortingOption} onChange={setSelectedSortingOption} />
            <div className='mt-10 flex flex-row gap-12'>
                <FilterTab filters={FILTERS} selectedFilter={selectedFilter} onChange={setSelectedFilter} />
                <ItemsGrid products={filteredProducts} />
            </div>
        </div>
    )
}
