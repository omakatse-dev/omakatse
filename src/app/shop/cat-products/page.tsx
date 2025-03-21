export const runtime = "nodejs";

import { getProductsByCollection } from "@/utils/APIs";
import Shopfront from "@/components/shop/Shopfront";
import { SortOption } from "@/types/Types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; filter?: string; tab?: string }>;
}) {
  const { sort } = await searchParams;

  const sortingMap: Record<string, string> = {
    "New Arrivals": "CREATED",
    "Best Selling": "BEST_SELLING",
    "Price: Low to High": "PRICE",
    "Price: High to Low": "PRICE",
  } as const;

  const defaultSort = "New Arrivals";
  const selectedSort = sort || defaultSort;

  const { products, categories } = await getProductsByCollection(
    "441832374531",
    sortingMap[selectedSort as keyof typeof sortingMap] as SortOption,
    selectedSort === "Price: High to Low"
  );

  return (
    <Shopfront products={products} categories={categories} petType="Cat" />
  );
}
