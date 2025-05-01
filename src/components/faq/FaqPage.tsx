"use client";

import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  CloseButton,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EntryFields, Entry, ChainModifiers } from "contentful";
import ScrollUpButton from "../common/ScrollUpButton";

export type faqType = {
  contentTypeId: "faq";
  fields: {
    category: EntryFields.Text;
    question: EntryFields.Text;
    answer: EntryFields.Text;
  };
};

export default function Page({
  faqs,
}: {
  faqs: Entry<faqType, ChainModifiers, string>[];
}) {
  const categoryRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
    "All",
    ...new Set(faqs.map((faq) => faq.fields.category)),
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
    <div className="relative flex flex-col items-center w-full md:px-64">

      {/* Dropdown Menu for Mobile */}
      <Disclosure
        as="div"
        className="w-full md:w-72 z-1 sticky top-28 md:top-32 md:hidden"
      >
        {({ open }) => (
          <>
            <DisclosureButton className="w-full text-left py-3 px-5 rounded-full border-1 bg-white bodyMD flex justify-between">
              {selectedCategory || "Select Category"}
              <ChevronDownIcon
                className={`h-6 transition-transform duration-300${
                  open ? "rotate-180" : ""
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
              <DisclosurePanel className="flex flex-col gap-5 absolute w-full mt-2 bg-white border rounded-[2rem] p-5 items-start">
                {categories.map((category) => (
                  <CloseButton
                    key={category.toString()}
                    className={`cursor-pointer bodyMD ${
                      selectedCategory === category ? "font-bold" : ""
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
      <div className="mt-6 mb-32 w-full flex flex-col gap-8 items-center">
        {Object.entries(groupedFaqs).map(([category, faqList]) => (
          <div
            key={category}
            ref={(el: HTMLDivElement | null) => {
              categoryRefs.current[category] = el;
            }}
            className="flex flex-col max-w-3xl justify-center p-6 bg-white rounded-xl md:rounded-[1.25rem] drop-shadow-[4px_4px_0px_rgba(228,223,209,1)] w-full"
          >
            <p className="bodyXL text-gray-500 mb-4">{category}</p>

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
                        className={`size-8 transition-all text-[#2C2420] min-w-9 ${
                          open ? "rotate-180" : ""
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
                      <DisclosurePanel className="bodyMD text-gray-700 pb-4">
                        {faq.fields.answer.toString()}
                      </DisclosurePanel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        ))}
        <ScrollUpButton className="fixed bottom-6 right-10" />
      </div>
    </div>
  );
}
