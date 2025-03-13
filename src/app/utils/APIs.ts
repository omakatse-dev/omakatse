import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { ProductEdgeInterface } from "./Interfaces";
import { SortOption } from "@/types/Types";


const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_API_URL || "",
  apiVersion: LATEST_API_VERSION,
  publicAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
