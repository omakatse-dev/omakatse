import MobilePageSelector from "@/components/account/MobilePageSelector";
import PageSelector from "@/components/account/PageSelector";
import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-28 mb-16 sm:mb-20 sm:mt-36 w-full px-6 max-w-7xl flex flex-col sm:flex-row sm:gap-24">
      <MobilePageSelector />
      <PageSelector />
      <div className="mt-8 sm:mt-0 w-full">{children}</div>
    </div>
  );
}
