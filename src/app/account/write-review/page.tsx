import ReviewForm from "@/components/account/reviews/ReviewForm";
import ReviewItemSummary from "@/components/account/reviews/ReviewItemSummary";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <div className="flex flex-col gap-8 max-w-4xl">
        <Link
          href="/account/reviews"
          className="flex items-center gap-2 bodyButton"
        >
          <ChevronLeftIcon className="w-6" />
          Go Back
        </Link>
        <h3 className="font-bold self-center sm:self-start text-primary">Write a review</h3>
        <ReviewItemSummary />
        <ReviewForm />
      </div>
    </Suspense>
  );
}
