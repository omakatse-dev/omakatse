import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { ProductEdgeInterface } from "./Interfaces";

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
}

export const getProductsByCollection = async (collectionID: string) => {

  const productQuery = `{
  collection(id: "gid://shopify/Collection/${collectionID}") {
    title
    products(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
}`;

  const { data } = await storefrontClient.request(productQuery);
  return data.collection.products;
}
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
  }`
  const { data } = await storefrontClient.request(query);
  return data
}
