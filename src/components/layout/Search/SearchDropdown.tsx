import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { getProductsBySearch } from "@/app/utils/APIs";
import { ProductSearchResultType } from "@/types/Types";
import ProductSearchResult from "./ProductSearchResult";

export default function SearchDropdown({
  handleClose,
  isOpen,
}: {
  handleClose: () => void;
  isOpen: boolean;
}) {
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ProductSearchResultType[]>(
    []
  );
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
        console.error("Search failed:", error);
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
        className={`w-screen h-screen bg-black/50 absolute z-20 ${
          !isOpen ? "hidden" : "block"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-screen bg-yellow-pastel z-30 flex flex-col items-center p-8 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SearchInput value={searchKey} onChange={setSearchKey} handleClose={handleClose} />
        {isLoading && <div>Searching...</div>}
        <div className="flex flex-col divide-y divide-gray-200 w-full mt-8">
          {searchResults.map((product) => (
            <ProductSearchResult key={product.id} product={product} />
          ))}
          {searchResults.length === 0 && searchKey.length > 2 && !isLoading && (
            <div className="bodyMD text-gray-800">No results found</div>
          )}
        </div>
      </div>
    </>
  );
}
