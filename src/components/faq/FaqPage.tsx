'use client';

import React, { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  CloseButton
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { EntryFields, Entry, ChainModifiers } from 'contentful';
import ScrollUpButton from '../common/ScrollUpButton';

export type faqType = {
  contentTypeId: 'faq';
  fields: {
    category: EntryFields.Text;
    question: EntryFields.Text;
    answer: EntryFields.Text;
  };
};

export default function Page({
  faqs
}: {
  faqs: Entry<faqType, ChainModifiers, string>[];
}) {
  const categoryRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    if (category === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = categoryRefs.current[category];

    if (element) {
      const navbarHeight = 190;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - navbarHeight, behavior: 'smooth' });
    }
  };

  const categories = [
    'All',
    ...new Set(faqs.map((faq) => faq.fields.category))
  ];

  // Group FAQs by category
  const groupedFaqs = faqs.reduce(
    (acc: Record<string, Entry<faqType>[]>, faq) => {
      const category = faq.fields.category;
      if (!acc[category.toString()]) {
        acc[category.toString()] = [];
      }
      acc[category.toString()].push(faq);
      return acc;
    },
    {}
  );

  return (
    <div className="relative flex w-full flex-col max-w-7xl items-center md:flex-row md:gap-20 md:px-64 md:mr-60">

      {/* Desktop Sidebar Navigation */}
      <div className="sticky top-40 mt-6 hidden flex-col gap-4 self-start md:flex w-fit">
        {categories.map((category) => (
          <button
            key={category.toString()}
            className="bodyMD text-primary text-left whitespace-nowrap"
            onClick={() => handleCategoryClick(category.toString())}
          >
            <span
              className={`inline-block ${
                selectedCategory === category
                  ? 'border-b-2 border-black pb-1 font-bold'
                  : ''
              }`}
            >
              {category.toString()}
            </span>
          </button>
        ))}
      </div>

      {/* Dropdown Menu for Mobile */}
      <Disclosure
        as="div"
        className="sticky top-28 z-1 w-full md:top-32 md:hidden md:w-72"
      >
        {({ open }) => (
          <>
            <DisclosureButton className="bodyMD flex w-full justify-between rounded-full border-1 bg-white px-5 py-3 text-left">
              {selectedCategory || 'Select Category'}
              <ChevronDownIcon
                className={`h-6 transition-transform duration-300${
                  open ? 'rotate-180' : ''
                }`}
              />
            </DisclosureButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-2"
            >
              <DisclosurePanel className="absolute mt-2 flex w-full flex-col items-start gap-5 rounded-[2rem] border bg-white p-5">
                {categories.map((category) => (
                  <CloseButton
                    key={category.toString()}
                    className={`bodyMD cursor-pointer ${
                      selectedCategory === category ? 'font-bold' : ''
                    }`}
                    onClick={() => handleCategoryClick(category.toString())}
                  >
                    {category.toString()}
                  </CloseButton>
                ))}
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>

      {/* FAQ List */}
      <div className="mt-6 mb-32 flex w-full md:w-fit flex-col items-center gap-8">
        {Object.entries(groupedFaqs).map(([category, faqList]) => (
          <div
            key={category}
            ref={(el: HTMLDivElement | null) => {
              categoryRefs.current[category] = el;
            }}
            className="flex w-full max-w-3xl flex-col justify-center rounded-xl bg-white p-6 drop-shadow-[4px_4px_0px_rgba(228,223,209,1)] md:rounded-[1.25rem]"
          >
            <p className="bodyXL mb-4 text-gray-500">{category}</p>

            {/* Render all FAQs for the category */}
            {faqList.map((faq, index) => (
              <Disclosure
                key={index}
                as="div"
                className="border-t-1 border-gray-200"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton className="group flex w-full items-center justify-between py-4 text-left">
                      <span className="bodyLG text-primary">
                        {faq.fields.question.toString()}
                      </span>
                      <ChevronDownIcon
                        className={`size-8 min-w-9 text-[#2C2420] transition-all ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </DisclosureButton>
                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-2"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-2"
                    >
                      <DisclosurePanel className="bodyMD pb-4 text-gray-700">
                        {faq.fields.answer.toString()}
                      </DisclosurePanel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        ))}
        <ScrollUpButton className="fixed right-10 bottom-6" />
      </div>
    </div>
  );
}
