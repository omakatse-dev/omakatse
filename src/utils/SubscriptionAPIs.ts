const endpoint = process.env.SUBSCRIPTION_WORKER_ENDPOINT || "";

export const getSubscriptions = async (email: string) => {
  const res = await fetch(endpoint + "subscription?email=" + email);
  const data = await res.json();
  return data;
};
