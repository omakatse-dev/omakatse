// app/api/subscribe/route.ts

import { createAdminApiClient } from "@shopify/admin-api-client";
import { LATEST_API_VERSION } from "@shopify/shopify-api";

const adminClient = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_API_URL || "",
  apiVersion: LATEST_API_VERSION,
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email address" }),
        { status: 400 }
      );
    }
    // GraphQL mutation to create a customer and set accepts_marketing to true
    const mutation = `
      mutation {
        customerCreate(input: { 
            email: ${email}       
            firstName: "Email", 
            lastName: "Subscriber",
        }) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    console.log("Sending mutation to Shopify:", mutation);

    // Send the email to Shopify API to add it as a customer
    const response = await adminClient.request(mutation);
    console.log("Shopify GraphQL Response:", response);
    const customerCreateResult = response?.data?.customerCreate;
    console.log("Customer Creation Result:", customerCreateResult);

    // Check if there were errors in the mutation response
    if (customerCreateResult?.userErrors?.length > 0) {
        console.error("Shopify User Errors:", customerCreateResult.userErrors);

      return new Response(
        JSON.stringify({
          success: false,
          message: customerCreateResult.userErrors[0].message,
        }),
        { status: 400 }
      );
    }

    // If no errors, return success response
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error adding email to Shopify:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
