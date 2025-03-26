import React from "react";
import { EntryFields } from "contentful";
import { getAllTermsAndConditions } from "@/utils/contentfulAPI";
import FaqPage from "@/components/faq/FaqPage";

export type TermsAndConditionsType = {
  contentTypeId: "termsAndConditions";
  fields: {
    title: EntryFields.Text;
    subtitle: EntryFields.Text;
    paragraph: EntryFields.Text;
  };
};

export default async function Page() {
  const termsAndConditions = await getAllTermsAndConditions();

  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20 flex flex-col gap-8 items-center">
      <h2>Terms & conditions</h2>
        <TermsAndConditionsPage termsAndConditions={termsAndConditions.items}></TermsAndConditionsPage>
    </div>
  );
}
