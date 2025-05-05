import React from 'react';
import Image from 'next/image';
import { EntryFields } from 'contentful';
import { getAllFaqs } from '@/utils/contentfulAPI';
import FaqPage from '@/components/faq/FaqPage';

export type faqType = {
  contentTypeId: 'faq';
  fields: {
    category: EntryFields.Text;
    question: EntryFields.Text;
    answer: EntryFields.Text;
  };
};

export default async function Page() {
  const faqs = await getAllFaqs();

  return (
    <div className="mx-8 mt-32 flex w-full flex-col items-center gap-8 md:mx-20 md:mt-42">
      <Image
        src="/assets/FAQkumo.svg"
        alt="FAQ Kumo"
        height="120"
        width="160"
      />
      <h2 className="text-primary">FAQs</h2>
      <FaqPage faqs={faqs.items}></FaqPage>
    </div>
  );
}
