export type SortOption = "CREATED" | "BEST_SELLING" | "PRICE";

type PriceRange = {
  minVariantPrice: {
    amount: string;
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
  variants?: {
    nodes: { id: string }[];
  };
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
    id: string;
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

export type Review = {
  author: string;
  id: string;
  product: string;
  price: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  date: string;
  rating: number;
  title: string;
  body: string;
  image: string | null;
  productId: string;
};

export type ReviewSummary = {
  rating: number;
  totalReviews: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  oneStarCount: number;
};

export type OtherProductsProps = {
  products: {
    id: string;
    title: string;
    featuredImage: {
      url: string;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    variants?: {
      nodes: { id: string }[];
    };
  }[];
};

export type CreateReviewPayload = Partial<Review>;
