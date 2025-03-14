"use client";

import { useEffect, useState } from "react";
import { ShopfrontProduct } from "@/types/Types";
import ItemsGrid from "./ItemsGrid";
import SortDropDown from "./SortDropDown";
import useQueryParams from "@/hooks/useQueryParams";
import Input from "../common/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SORTING_OPTIONS = [
  "New Arrivals",
  "Best Selling",
  "On Sale",
  "In Stock",
  "Price: Low to High",
  "Price: High to Low",
];

export default function SearchShopfront({
  searchKey,
  products,
}: {
  searchKey: string;
  products: ShopfrontProduct[];
}) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    getQueryParam("sort") || SORTING_OPTIONS[0]
  );

  useEffect(() => {
    setQueryParam("sort", selectedSortingOption);
  }, [selectedSortingOption]);

  return (
    <div className="mt-28 sm:mt-36 w-full max-w-7xl flex flex-col pb-16 px-6">
      <h2>Results for "{searchKey}"</h2>
      <div className="mt-4 border-b border-gray-200 pb-4 bodyMD">Showing {products.length} results(s)</div>

      <SortDropDown
        options={SORTING_OPTIONS}
        selectedOption={selectedSortingOption}
        onChange={setSelectedSortingOption}
        className="mt-4"
      />

      <ItemsGrid products={products} className="mt-10" />
    </div>
  );
}
