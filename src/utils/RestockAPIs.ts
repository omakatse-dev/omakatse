"use server";

const endpoint = process.env.RESTOCK_WORKER_ENDPOINT;

export const subscribeToRestock = async (variantId: string, email: string) => {
  await fetch(endpoint + "subscribe", {
    method: "POST",
    body: JSON.stringify({ variantId, email }),
  });
};
