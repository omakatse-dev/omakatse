'use client';

import { useEffect, useState } from 'react';
import { ShopfrontProduct } from '@/types/Types';
import ItemsGrid from './ItemsGrid';
import SortDropDown from './SortDropDown';
import useQueryParams from '@/hooks/useQueryParams';

const SORTING_OPTIONS = [
  'New Arrivals',
  'Best Selling',
  'On Sale',
  'In Stock',
  'Price: Low to High',
  'Price: High to Low'
];

export default function SearchShopfront({
  searchKey,
  products
}: {
  searchKey: string;
  products: ShopfrontProduct[];
}) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    getQueryParam('sort') || SORTING_OPTIONS[0]
  );

  useEffect(() => {
    setQueryParam('sort', selectedSortingOption);
  }, [selectedSortingOption, setQueryParam]);

  return (
    <div className="mt-28 flex w-full max-w-7xl flex-col px-6 pb-16 sm:mt-36">
      <h2 className="text-primary">Results for &quot;{searchKey}&quot;</h2>
      <div className="bodyMD mt-4 border-b border-gray-200 pb-4">
        Showing {products.length} results(s)
      </div>

      {products.length > 0 && (
        <SortDropDown
          options={SORTING_OPTIONS}
          selectedOption={selectedSortingOption}
          onChange={setSelectedSortingOption}
          className="mt-4"
        />
      )}

      <ItemsGrid products={products} className="mt-10" />
    </div>
  );
}
