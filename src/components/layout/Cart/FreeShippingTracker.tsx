import ProgressBar from "@/components/subscription/ProgressBar";
import React from "react";

export default function FreeShippingTracker({
  amountMore,
}: {
  amountMore: number;
}) {
  return (
    <div className="flex flex-col items-center mt-3 gap-1 w-full">
      {amountMore > 0 ? (
        <div className="bodySM">
          Spend AED {amountMore} more and get free shipping!
        </div>
      ) : (
        <div>🎉 You&apos;ve unlocked free shipping!</div>
      )}
      <ProgressBar
        currentStep={Math.min(100 - amountMore, 100)}
        totalSteps={100}
        showSteps={false}
      />
    </div>
  );
}
