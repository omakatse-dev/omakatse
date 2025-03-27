import React from "react";
import Image from "next/image";
import { EntryFields } from "contentful";
import { getAllFaqs } from "@/utils/contentfulAPI";
import FaqPage from "@/components/faq/FaqPage";

export type faqType = {
  contentTypeId: "faq";
  fields: {
    category: EntryFields.Text;
    question: EntryFields.Text;
    answer: EntryFields.Text;
  };
};

export default async function Page() {
  const faqs = await getAllFaqs();

  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20 flex flex-col gap-8 items-center">
      <Image
        src="/assets/FAQkumo.svg"
        alt="FAQ Kumo"
        height="120"
        width="160"
      />
      <h2>FAQs</h2>
        <FaqPage faqs={faqs.items}></FaqPage>
    </div>
  );
}
