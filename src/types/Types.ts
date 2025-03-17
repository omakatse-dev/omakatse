export type SortOption = "CREATED" | "BEST_SELLING" | "PRICE";

type PriceRange = {
  minVariantPrice: {
    amount: number;
  };
};

export type Metafield = {
  key: string;
  value: string;
};

export type ShopfrontProduct = {
  id: string;
  title: string;
  description: string;
  compareAtPriceRange: PriceRange;
  featuredImage: {
    url: string;
  };
  priceRange: PriceRange;
  tags: string[];
  metafields: Metafield[];
};

export type ProductDetailsType = {
  title: string;
  id: string;
  description: string;
  tags: string[];
  options: Option[];
  variants: VariantNodes;
  images: ProductImageNode;
  metafield: Metafield;
};

export type ProductImageNode = {
  nodes: {
    url: string;
  }[];
};

type Option = {
  name: string;
  optionValues: OptionValue[];
};

export type OptionValue = {
  name: string;
};

type VariantNodes = {
  nodes: {
    price: {
      amount: string;
    };
    compareAtPrice: {
      amount: string;
    };
    quantityAvailable: number;
    selectedOptions: SelectedOption[];
  }[];
};

type SelectedOption = {
  name: string;
  value: string;
};
