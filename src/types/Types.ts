import { ProductOption } from "@/types/admin.types";
export type SortOption = "CREATED" | "BEST_SELLING" | "PRICE";
import { EntryFields } from "contentful";

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
  options: ProductOption[];
  variants: VariantNodes;
  images: ProductImageNode;
  metafield: Metafield;
};

export type ProductImageNode = {
  nodes: {
    url: string;
  }[];
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

export type SubscriptionContract = {
  contractId: string;
  boxIds: string;
  address: string;
  date: string;
  email: string;
  items: string;
  name: string;
  nextBillingDate: string;
  number: number;
  pets: string;
  petsId: string;
  size: string;
  planDuration: number;
  status: string;
  nextRenewalDate: string;
};

export type BlogPostType = {
  contentTypeId: "blogPost";
  fields: {
    blogId: EntryFields.Integer;
    categoryTag: EntryFields.Symbol;
    title: EntryFields.Text;
    editedDate: EntryFields.Date;
    postedDate: EntryFields.Date;
    readDuration: EntryFields.Integer;
    author: EntryFields.Text;
    imageHeader: EntryFields.AssetLink;
    description: EntryFields.RichText;
    summary: EntryFields.Text;
    slug: EntryFields.Text;
  };
};

export type PastBoxType = {
  contractId: string;
  size: string;
  nextBillingDate: string;
  address: string;
  name: string;
  planDuration: number;
  email: string;
  nextRenewalDate: string;
  status: string;
  boxId: string;
  date: string;
  number: number;
  paymentDate: string;
  items: string;
};

export type ContractType = {
  contractId: string;
  size: string;
  nextBillingDate: string;
  address: string;
  name: string;
  planDuration: number;
  email: string;
  nextRenewalDate: string;
  status: string;
  petsId: string;
  pets: string;
};

export type PastBoxDetailsType = {
  contractId: string;
  size: string;
  nextBillingDate: string;
  address: string;
  name: string;
  planDuration: number;
  email: string;
  nextRenewalDate: string;
  status: string;
  petsId: string;
  pets: string;
  boxId: string;
  date: string;
  number: number;
  paymentDate: string;
  items: string;
};
