"use server";

import { PetDetailsSchema } from "@/components/account/pet-profiles/PetProfileForm";

const endpoint = process.env.SUBSCRIPTION_WORKER_ENDPOINT || "";
// const schedulerEndpoint = process.env.SCHEDULER_WORKER_ENDPOINT || "";
// const restockEndpoint = process.env.RESTOCK_WORKER_ENDPOINT || "";

const ensureTrailingSlash = (url: string) => {
  return url.endsWith("/") ? url : url + "/";
};

export const getSubscriptions = async (email: string) => {
  const res = await fetch(
    ensureTrailingSlash(endpoint) + "subscription?email=" + email
  );
  const data = await res.json();
  return data;
};

export const saveExitSurveyData = async (
  email: string,
  reason: string,
  customReason: string,
  returnRating: number,
  comments: string
) => {
  const sheetsEndpoint = process.env.CANCELLATION_FORM_ENDPOINT || "";
  const res = await fetch(sheetsEndpoint, {
    method: "POST",
    body: JSON.stringify({
      email,
      reason,
      customReason,
      returnRating,
      comments,
    }),
  });
  return res.body;
};

export const deactivateSubscription = async (contractId: string) => {
  await fetch(endpoint + "deactivateContract", {
    method: "PUT",
    body: JSON.stringify({ contractId }),
  });
};

export const getPetsByContractId = async (contractId: string) => {
  const res = await fetch(endpoint + "pet?contractId=" + contractId);
  const data = await res.json();
  return data.results;
};

export const updatePets = async (
  contractId: string,
  newPetDetails: PetDetailsSchema,
  petIndex: number
) => {
  console.log({
    contractId,
    newPetDetails,
    petIndex,
  });
  const res = await fetch(endpoint + "editPets", {
    method: "PUT",
    body: JSON.stringify({ contractId, newPetDetails, petIndex }),
  });
  const data = await res.json();
  return data;
};

export const removePet = async (contractId: string, petIndex: number) => {
  const res = await fetch(endpoint + "removePet", {
    method: "PUT",
    body: JSON.stringify({ contractId, petIndex }),
  });
  const data = await res.json();
  return data;
};

export const getPastBoxesByEmail = async (email: string) => {
  const res = await fetch(endpoint + "pastBoxes?email=" + email);
  // console.log("endpoint", endpoint + "pastBoxes?email=" + email)
  const data = await res.json();
  return data;
};

export const getPetProfilesByEmail = async (email: string) => {
  const res = await fetch(endpoint + "pets?email=" + email);
  const data = await res.json();
  return data.results;
};

export const getPastBoxById = async (boxId: string) => {
  const res = await fetch(endpoint + "box?boxId=" + boxId);
  const data = await res.json();
  return data;
};
