"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { EntryFields, Entry } from "contentful";
import dayjs from "dayjs";
import ScrollUpButton from "../common/ScrollUpButton";

export type PrivacyPolicyType = {
  contentTypeId: "privacyPolicy";
  fields: {
    title: EntryFields.Text;
    content: EntryFields.RichText;
  };
  sys: {
    updatedAt: EntryFields.Text;
  };
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="bodyMD mb-8 text-gray-800">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h4 className="mb-6 text-primary">{children}</h4>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <div className="bodyLG mb-3 text-primary">{children}</div>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
      <ol className="list-decimal ml-4">{children}</ol>
    ),
    [BLOCKS.HR]: (_: any, children: React.ReactNode) => (
      <div className="mb-8 text-gray-400 border-1">{children}</div>
    ),
  },
};

export default function PrivacyPolicyPage({ pp }: { pp: Entry<PrivacyPolicyType> }) {
  const PrivacyPolicy = pp.fields
    .content as unknown as Document;
  const latestUpdate = dayjs(pp.sys.updatedAt);
  return (
    <div className="flex flex-col w-full max-w-2xl">
      <h2 className="mb-2 text-primary">Privacy Policy</h2>
      <p className="bodySM mb-6">
        Last updated: {latestUpdate.format("MMM D, YYYY")}
      </p>
      <div className="mb-20">
        {documentToReactComponents(PrivacyPolicy, options)}
      </div>
      <ScrollUpButton className="fixed bottom-6 right-10" />
    </div>
  );
}
