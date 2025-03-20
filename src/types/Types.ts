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

type Reviewer = {
  id: number;
  external_id: number;
  email: string;
  name: string;
  phone: string | null;
  accepts_marketing: boolean;
  unsubscribed_at: string | null;
  tags: string[];
};

export type Review = {
  id: number;
  title: string;
  body: string;
  rating: number;
  product_external_id: number;
  reviewer: Reviewer;
  source: string;
  curated: string;
  published: boolean;
  hidden: boolean;
  verified: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  has_published_pictures: boolean;
  has_published_videos: boolean;
  pictures: string[]; // or specific type if pictures have a structure
  ip_address: string;
  product_title: string;
  product_handle: string;
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

export type CreateReviewPayload = {
  name: string;
  email: string;
  title: string;
  rating: number;
  body: string;
  id: string;
  shop_domain: string;
};
