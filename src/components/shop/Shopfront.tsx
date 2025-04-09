"use client";

import Image from "next/image";
import FilterTab from "@/components/shop/FilterTab";
import SortDropDown from "@/components/shop/SortDropDown";
import Tabs from "@/components/common/Tabs";
import React, { useEffect, useState } from "react";
import ItemsGrid from "@/components/shop/ItemsGrid";
import useQueryParams from "@/hooks/useQueryParams";
import { ShopfrontProduct } from "@/types/Types";
import MobileTabs from "../common/MobileTabs";
import SubCategoryDropdown from "./SubCategoryDropdown";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import MobileSortSideBar from "./MobileSortSideBar";

export default function Shopfront({
  products,
  categories,
  petType,
}: {
  products: ShopfrontProduct[];
  categories: Record<string, string[]>;
  petType: "Dog" | "Cat";
}) {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const TABS = Object.keys(categories);
  const [selectedTab, setSelectedTab] = useState(
    getQueryParam("tab") || TABS[0]
  );

  const [showMobileSortSidebar, setShowMobileSortSidebar] = useState(false);

  const FILTERS = categories[selectedTab as keyof typeof categories];
  const [selectedFilter, setSelectedFilter] = useState(
    getQueryParam("filter") || FILTERS[0]
  );

  useEffect(() => {
    setSelectedFilter(FILTERS[0]);
    setQueryParam("filter", FILTERS[0]);
  }, [selectedTab]);

  const SORTING_OPTIONS = [
    "New Arrivals",
    "Best Selling",
    "Price: Low to High",
    "Price: High to Low",
  ];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    getQueryParam("sort") || SORTING_OPTIONS[0]
  );

  useEffect(() => {
    setQueryParam("tab", selectedTab);
  }, [selectedTab, setQueryParam]);

  useEffect(() => {
    setQueryParam("filter", selectedFilter);
  }, [selectedFilter, setQueryParam]);

  useEffect(() => {
    setQueryParam("sort", selectedSortingOption);
  }, [selectedSortingOption, setQueryParam]);

  const filteredProducts = products.filter((product) => {
    return (
      product.metafields.find((metafield) => metafield.key === "category")
        ?.value === selectedTab &&
      (product.metafields.find((metafield) => metafield.key === "sub_category")
        ?.value === selectedFilter ||
        selectedFilter === "All")
    );
  });

  const petImageSrc =
    petType === "Cat" ? "/assets/CatIcon.svg" : "/assets/DogIcon.svg";

  const filterCounts: Record<string, number> = {};

  FILTERS.forEach((filter) => {
    const count = products.filter((product) => {
      const category = product.metafields.find(
        (m) => m.key === "category"
      )?.value;
      const subCategory = product.metafields.find(
        (m) => m.key === "sub_category"
      )?.value;

      return (
        category === selectedTab && (subCategory === filter || filter === "All")
      );
    }).length;

    filterCounts[filter] = count;
  });
  return (
    <>
      <div className="mt-36 w-full px-6 max-w-7xl flex flex-col pb-16">
        <div className="flex flex-row justify-between">
          <div>
            <h2>
              Shop {petType} {selectedTab}
            </h2>
            <div className="mt-4 bodyMD flex gap-2 items-center">
              <div className="rounded-full bg-white w-10 h-10 p-2 flex flex-row sm:hidden">
                <Image
                  src={petImageSrc}
                  alt="Pet Icon"
                  width={32}
                  height={32}
                />
              </div>
              Showing {filteredProducts.length} product(s)
            </div>
          </div>
          <div className="rounded-full bg-white w-16 h-16 p-4 hidden sm:flex">
            <Image src={petImageSrc} alt="Pet Icon" width={50} height={50} />
          </div>
        </div>
        <Tabs
          tabs={TABS}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
          className="hidden sm:flex w-fit self-center mt-10 bg-gray-200"
        />
        <MobileTabs
          tabs={TABS}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
          className="sm:hidden"
        />
        <SortDropDown
          className="mt-4 hidden sm:flex"
          options={SORTING_OPTIONS}
          selectedOption={selectedSortingOption}
          onChange={setSelectedSortingOption}
        />
        <div className="flex flex-row justify-between items-center gap-2 sm:hidden">
          <SubCategoryDropdown
            options={FILTERS}
            selectedOption={selectedFilter}
            onChange={setSelectedFilter}
            className="w-full"
          />
          <div
            className="border rounded-full h-full aspect-square cursor-pointer bg-white flex items-center justify-center"
            onClick={() => setShowMobileSortSidebar(true)}
          >
            <ArrowsUpDownIcon className="w-6" />
          </div>
        </div>
        <div className="mt-10 flex flex-row gap-12">
          <FilterTab
            filters={FILTERS}
            selectedFilter={selectedFilter}
            onChange={setSelectedFilter}
            className="hidden sm:flex"
            counts={filterCounts}
          />
          <ItemsGrid products={filteredProducts} />
        </div>
      </div>
      <MobileSortSideBar
        isOpen={showMobileSortSidebar}
        handleClose={() => setShowMobileSortSidebar(false)}
        sortingOptions={SORTING_OPTIONS}
        selectedSortingOption={selectedSortingOption}
        setSelectedSortingOption={setSelectedSortingOption}
      />
    </>
  );
}
