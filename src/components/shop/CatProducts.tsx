'use client';

import useQueryParams from '@/hooks/useQueryParams';
import { useState, useEffect } from 'react';
import Tabs from '../common/Tabs';
import FilterTab from './FilterTab';
import ItemsGrid from './ItemsGrid';
import SortDropDown from './SortDropDown';
import { ShopfrontProduct } from '@/types/Types';

export default function CatProducts({
  products,
  categories
}: {
  products: ShopfrontProduct[];
  categories: Record<string, string[]>;
}) {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const TABS = Object.keys(categories);
  const [selectedTab, setSelectedTab] = useState(
    getQueryParam('tab') || TABS[0]
  );

  const FILTERS = categories[selectedTab as keyof typeof categories];
  const [selectedFilter, setSelectedFilter] = useState(
    getQueryParam('filter') || FILTERS[0]
  );

  const SORTING_OPTIONS = [
    'New Arrivals',
    'Best Selling',
    'Price: Low to High',
    'Price: High to Low'
  ];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    getQueryParam('sort') || SORTING_OPTIONS[0]
  );

  const filterCounts: Record<string, number> = {};

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

  return (
    <div className="mt-36 flex w-full max-w-7xl flex-col pb-16">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-primary">Shop Cat Products</h2>
          <div className="bodyMD mt-4">Showing all cat products</div>
        </div>
        <div className="h-12 w-12 bg-amber-500" />
      </div>
      <Tabs
        tabs={TABS}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
        className="mt-10 w-fit self-center"
      />
      <SortDropDown
        className="mt-4"
        options={SORTING_OPTIONS}
        selectedOption={selectedSortingOption}
        onChange={setSelectedSortingOption}
      />
      <div className="mt-10 flex flex-row gap-12">
        <FilterTab
          filters={FILTERS}
          selectedFilter={selectedFilter}
          onChange={setSelectedFilter}
          counts={filterCounts}
        />
        <ItemsGrid products={filteredProducts} />
      </div>
    </div>
  );
}
