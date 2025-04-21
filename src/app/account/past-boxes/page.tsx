import React from "react";
import PastBoxCard from "@/components/subscription/PastBoxCard";

export default function PastBoxesPage() {
  return (
    <div>
      <h2 className="hidden lg:block">Past Boxes</h2>
      {/* here, i will have to get all boxes under each subscription (contractid) and pass to each card*/}
      <PastBoxCard />
    </div>
  );
}
