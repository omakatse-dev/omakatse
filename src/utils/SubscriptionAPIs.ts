"use server";
const endpoint = process.env.SUBSCRIPTION_WORKER_ENDPOINT || "";

export const getSubscriptions = async (email: string) => {
  const res = await fetch(endpoint + "subscription?email=" + email);
  const data = await res.json();
  return data;
};

export const saveExitSurveyData = async (
  reason: string,
  customReason: string,
  returnRating: number,
  comments: string
) => {
  const sheetsEndpoint = process.env.CANCELLATION_FORM_ENDPOINT || "";
  const res = await fetch(sheetsEndpoint, {
    method: "POST",
    body: JSON.stringify({ reason, customReason, returnRating, comments }),
  });
  return res.body;
};

export const deactivateSubscription = async (contractId: string) => {
  const res = await fetch(endpoint + "deactivateContract", {
    method: "PUT",
    body: JSON.stringify({ contractId }),
  });
  return res.body;
};
