import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { ProductEdgeInterface } from "./Interfaces";

export const getStoreFront = async () => {
  const storefrontClient = createStorefrontApiClient({
      storeDomain: process.env.NEXT_PUBLIC_API_URL || "",
      apiVersion: LATEST_API_VERSION,
      publicAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    });

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