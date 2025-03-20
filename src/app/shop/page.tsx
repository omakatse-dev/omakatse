import SearchShopfront from "@/components/shop/SearchShopfront";
import { getProductsBySearch } from "../../utils/APIs";
import { SortOption } from "@/types/Types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ searchKey: string; sort?: string }>;
}) {
  const { searchKey, sort } = await searchParams;

  const sortingMap: Record<string, string> = {
    "New Arrivals": "CREATED_AT",
    "Best Selling": "BEST_SELLING",
    "Price: Low to High": "PRICE",
    "Price: High to Low": "PRICE",
  } as const;

  const defaultSort = "New Arrivals";
  const selectedSort = sort || defaultSort;

  const products = await getProductsBySearch(
    searchKey,
    sortingMap[selectedSort] as SortOption,
    selectedSort === "Price: High to Low"
  );

  return <SearchShopfront searchKey={searchKey} products={products} />;
}
