"use server";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { createAdminApiClient } from "@shopify/admin-api-client";
import { ProductEdgeInterface } from "./Interfaces";
import { CreateReviewPayload, SortOption } from "@/types/Types";

const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_API_URL || "",
  apiVersion: LATEST_API_VERSION,
  publicAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});

const adminClient = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_API_URL || "",
  apiVersion: LATEST_API_VERSION,
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "",
});

export const getStoreFront = async () => {
  const productQuery = `{
      products(first: 3) {
        edges {
          node {
            id
            title
            description
          }
        }
      }
    }`;

  const { data } = await storefrontClient.request(productQuery);
  return data.products.edges.map((edge: ProductEdgeInterface) => edge.node);
};

export const getProductsByCollection = async (
  collectionID: string,
  sortBy?: SortOption,
  reverse?: boolean
) => {
  const productQuery = `{
  collection(id: "gid://shopify/Collection/${collectionID}") {
    title
    metafield(namespace: "custom", key: "categories") {
          value
          key
        }
    products(
      first: 100,
      sortKey: ${sortBy || "PRICE"},
      reverse: ${reverse || false}
    ) {
      edges {
        node {
          id
          title
          tags
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url
          }
          metafields(identifiers: [
            { namespace: "custom", key: "sub_category" },
            { namespace: "custom", key: "category" }
          ]) {
            key
            value
          }
        }
      }
    }
  }
}`;

  const res = await storefrontClient.request(productQuery);
  return {
    products: res.data.collection.products.edges.map(
      (edge: ProductEdgeInterface) => edge.node
    ),
    categories: JSON.parse(res.data.collection.metafield.value),
  };
};

export const getProductsBySearch = async (
  searchKey: string,
  sortBy?: SortOption,
  reverse?: boolean
) => {
  const query = `{
    products(query: "${searchKey}", 
      first: 10, 
      sortKey: ${sortBy || "PRICE"},
      reverse: ${reverse || false}) {
        edges {
          node {
            id
            title
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              url
            }
          }
        }
    }
  }`;
  const res = await storefrontClient.request(query);
  return res.data.products.edges.map((edge: ProductEdgeInterface) => edge.node);
};
export const getSellingPlans = async () => {
  const query = `{
      collection(id: "gid://shopify/Collection/441616957699") {
        title
        products(first: 100) {
        edges {
          node {
              id
              title
              sellingPlanGroups(first: 10) {
              edges {
                node {
                    id
                    name
                    sellingPlans(first: 10) {
                    edges {
                      node {
                          id
                          name
                          description
                        billingPolicy {
                          ... on SellingPlanRecurringBillingPolicy {
                            interval
                            intervalCount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  const { data } = await storefrontClient.request(query);
  return data;
};

export const getProductDetailsByID = async (productID: string) => {
  const productQuery = `{
  product(id: "gid://shopify/Product/${productID}") {
    id
    title
    tags
    description
    collections(first: 1) {
      nodes {
        products(first: 5, sortKey: BEST_SELLING) {
          nodes {
            id
            title
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
      }
    }
    variants(first: 50) {
      nodes {
        id
        price {
          amount
        }
        compareAtPrice {
          amount
        }
        quantityAvailable
        selectedOptions {
          name
          value
        }
      }
    }
    images(first: 5) {
      nodes {
        url
      }
    }
    metafield(key: "details", namespace: "custom") {
      key
      value
    }
  }}`;

  const res = await storefrontClient.request(productQuery);
  return res.data.product;
};

export const createCart = async (
  lines: { merchandiseId: string; quantity: number }[]
) => {
  const cartQuery = `
  mutation createCart($lines: [CartLineInput!]) {
    cartCreate(
      input: {
        lines: $lines
      }
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const res = await storefrontClient.request(cartQuery, {
    variables: { lines },
  });
  return res.data.cartCreate.cart;
};

export const getReviewByProductID = async (productID: string) => {
  // TODO: call get review endpoint
  console.log(productID);
  return [];
  // const res = await fetch(
  //   `https://api.judge.me/api/v1/reviews?shop_domain=${process.env.NEXT_PUBLIC_JUDGE_SHOP_DOMAIN}&api_token=${process.env.JUDGE_API_KEY}`
  // );
  // const data = await res.json();
  // return data.reviews.filter(
  //   (review: Review) =>
  //     review.product_external_id.toString() === productID && review.published
  // );
};

export const createReview = async (payload: CreateReviewPayload) => {
  // TODO: call create review endpoint
  console.log(payload);
};

export const getFulfilledOrdersByEmail = async (email: string) => {
  const query = `
  #graphql
    query GetCustomerByEmail($email: String!) {
      customers(first: 1, query: $email) {
        edges {
          node {
            id
            orders(first: 100, query: "fulfillment_status:fulfilled") {
              edges {
                node {
                  fulfillments(first: 10) {
                    fulfillmentLineItems(first: 10) {
                      edges {
                        node {
                          lineItem {
                            id
                            image {
                              url
                            }
                            name
                            variant {
                              price
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const res = await adminClient.request(query, {
    variables: {
      email: email,
    },
  });

  return res.data?.customers.edges[0].node.orders.edges
    .flatMap((order) => order.node.fulfillments)
    .flatMap((fulfillment) =>
      fulfillment.fulfillmentLineItems.edges.map((edge) => edge.node.lineItem)
    )
    .filter(Boolean);
};

export const uploadReviewImage = async (
  image: string,
  id: string,
  fileType: string
) => {
  const res = await fetch(
    "https://omakatse-review-image-uploader.matthew-3c3.workers.dev/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        id: id,
        fileType: fileType,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error uploading image" + data.msg);
  }

  return data;
};
