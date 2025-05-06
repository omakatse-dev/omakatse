import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import { getProductsBySearch } from '@/utils/APIs';
import { ShopfrontProduct } from '@/types/Types';
import ProductSearchResult from './ProductSearchResult';

export default function SearchDropdown({
  handleClose,
  isOpen
}: {
  handleClose: () => void;
  isOpen: boolean;
}) {
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ShopfrontProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchKey.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await getProductsBySearch(searchKey);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchKey]);

  return (
    <>
      <div
        className={`bg-primary/50 fixed inset-0 z-20 ${
          !isOpen ? 'hidden' : 'block'
        }`}
        onClick={handleClose}
      />
      <div
        className={`bg-yellow-pastel fixed top-0 left-0 z-30 flex h-screen w-full flex-col items-center p-8 transition-all duration-300 sm:w-96 xl:right-0 xl:left-auto ${
          isOpen
            ? '-translate-x-0 xl:translate-x-0'
            : '-translate-x-full xl:translate-x-full'
        }`}
      >
        <SearchInput
          value={searchKey}
          onChange={setSearchKey}
          handleClose={handleClose}
          isOpen={isOpen}
        />
        {isLoading && <div>Searching...</div>}
        <div className="mt-8 flex w-full flex-col divide-y divide-gray-200">
          {searchResults.map((product) => (
            <ProductSearchResult key={product.id} product={product} />
          ))}
          {searchResults.length === 0 && searchKey.length > 2 && !isLoading && (
            <div className="bodyxl text-gray-800">No results found</div>
          )}
        </div>
      </div>
    </>
  );
}
