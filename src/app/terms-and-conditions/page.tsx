import React from "react";
import { EntryFields } from "contentful";
import { getTermsAndConditions } from "@/utils/contentfulAPI";
import TermsAndConditionsPage from "@/components/termsandconditions/TermsAndConditionsPage";

export type TermsAndConditionsType = {
  contentTypeId: "termsAndConditions";
  fields: {
    title: EntryFields.Text;
    termsAndConditions: EntryFields.RichText;
  };
  sys: {
    updatedAt: EntryFields.Text;
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ preview: string }>;
}) {
  const { preview } = await searchParams;
  const termsAndConditions = await getTermsAndConditions(preview);
  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20 flex flex-col gap-8 items-center">
      {termsAndConditions ? (
        <TermsAndConditionsPage tac={termsAndConditions} />
      ) : (
        <p>Terms and Conditions data is not available.</p>
      )}
    </div>
  );
}
