'use client';

import Image from 'next/image';
import FilterTab from '@/components/shop/FilterTab';
import SortDropDown from '@/components/shop/SortDropDown';
import Tabs from '@/components/common/Tabs';
import React, { useEffect, useState } from 'react';
import ItemsGrid from '@/components/shop/ItemsGrid';
import useQueryParams from '@/hooks/useQueryParams';
import { ShopfrontProduct } from '@/types/Types';
import MobileTabs from '../common/MobileTabs';
import SubCategoryDropdown from './SubCategoryDropdown';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import MobileSortSideBar from './MobileSortSideBar';
import { useSearchParams } from 'next/navigation';

export default function Shopfront({
  products,
  categories,
  petType
}: {
  products: ShopfrontProduct[];
  categories: Record<string, string[]>;
  petType: 'Dog' | 'Cat';
}) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  console.log('here', getQueryParam('filter'));
  const TABS = Object.keys(categories);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || TABS[0];
  const [selectedTab, setSelectedTab] = useState(tabParam);

  useEffect(() => {
    setSelectedTab(tabParam);
  }, [tabParam]);

  const [showMobileSortSidebar, setShowMobileSortSidebar] = useState(false);

  const FILTERS = categories[selectedTab as keyof typeof categories];
  const filterParam = searchParams.get('filter') || FILTERS[0];
  const [selectedFilter, setSelectedFilter] = useState(filterParam);

  useEffect(() => {
    setSelectedFilter(filterParam);
  }, [filterParam]);

  const SORTING_OPTIONS = [
    'New Arrivals',
    'Best Selling',
    'Price: Low to High',
    'Price: High to Low'
  ];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    getQueryParam('sort') || SORTING_OPTIONS[0]
  );

  useEffect(() => {
    setQueryParam('tab', selectedTab);
  }, [selectedTab, setQueryParam]);

  useEffect(() => {
    setQueryParam('filter', selectedFilter);
  }, [selectedFilter, setQueryParam]);

  useEffect(() => {
    setQueryParam('sort', selectedSortingOption);
  }, [selectedSortingOption, setQueryParam]);

  const filteredProducts = products.filter((product) => {
    return (
      product.metafields.find((metafield) => metafield.key === 'category')
        ?.value === selectedTab &&
      (product.metafields.find((metafield) => metafield.key === 'sub_category')
        ?.value === selectedFilter ||
        selectedFilter === 'All')
    );
  });

  const changeTabHandler = (tab: string) => {
    setSelectedTab(tab);
    setQueryParam('filter', FILTERS[0]);
    setSelectedFilter(FILTERS[0]);
  };

  const petImageSrc =
    petType === 'Cat' ? '/assets/CatIcon.svg' : '/assets/DogIcon.svg';

  const filterCounts: Record<string, number> = {};

  FILTERS.forEach((filter) => {
    const count = products.filter((product) => {
      const category = product.metafields.find(
        (m) => m.key === 'category'
      )?.value;
      const subCategory = product.metafields.find(
        (m) => m.key === 'sub_category'
      )?.value;

      return (
        category === selectedTab && (subCategory === filter || filter === 'All')
      );
    }).length;

    filterCounts[filter] = count;
  });
  return (
    <>
      <div className="mt-30 flex w-full max-w-7xl flex-col px-6 pb-16 sm:mt-36">
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-primary">
              Shop {petType} {selectedTab}
            </h2>
            <div className="bodyMD mt-4 flex items-center gap-2">
              <div className="flex h-10 w-10 flex-row rounded-full bg-white p-2 sm:hidden">
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
          <div className="hidden h-16 w-16 rounded-full bg-white p-4 sm:flex">
            <Image src={petImageSrc} alt="Pet Icon" width={50} height={50} />
          </div>
        </div>
        <Tabs
          tabs={TABS}
          selectedTab={selectedTab}
          onChange={changeTabHandler}
          className="mt-10 hidden w-fit self-center bg-gray-200 sm:flex"
        />
        <MobileTabs
          tabs={TABS}
          selectedTab={selectedTab}
          onChange={changeTabHandler}
          className="sm:hidden"
        />
        {filteredProducts.length > 0 && (
          <SortDropDown
            className="mt-4 hidden sm:flex"
            options={SORTING_OPTIONS}
            selectedOption={selectedSortingOption}
            onChange={setSelectedSortingOption}
          />
        )}
        <div className="flex flex-row items-center justify-between gap-2 sm:hidden">
          <SubCategoryDropdown
            options={FILTERS}
            selectedOption={selectedFilter}
            onChange={setSelectedFilter}
            className="w-full"
            counts={filterCounts}
          />
          <div
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded-full border bg-white"
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
