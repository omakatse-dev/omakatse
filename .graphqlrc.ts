import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset";
import { LATEST_API_VERSION } from "@shopify/shopify-api";

export default {
  schema: "https://shopify.dev/admin-graphql-direct-proxy/2023-10",
  documents: ["src/utils/APIs.ts"],
  projects: {
    // To produce variable / return types for Admin API operations
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: LATEST_API_VERSION,
      documents: ["src/utils/APIs.ts"],
      outputDir: "./src/types",
    }),
  },
};
