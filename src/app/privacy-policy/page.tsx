import React from "react";
import { getPrivacyPolicy } from "@/utils/contentfulAPI";
import PrivacyPolicyPage from "@/components/privacy-policy/PrivacyPolicyPage";
  
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ preview: string }>;
}) {
  const { preview } = await searchParams;
  const privacyPolicy = await getPrivacyPolicy(preview);
  return (
    <div className="w-full mt-32 md:mt-42 mx-8 md:mx-20 flex flex-col gap-8 items-center">
      {privacyPolicy ? (
        <PrivacyPolicyPage pp={privacyPolicy} />
      ) : (
        <p className="text-primary">Privacy Policy data is not available.</p>
      )}
    </div>
  );
}
