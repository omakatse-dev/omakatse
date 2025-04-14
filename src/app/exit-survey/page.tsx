import ExitSurvey from "@/components/account/subscriptions/ExitSurvey";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl">
      <Link
        href="/account/subscriptions"
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </Link>
      <h3 className="font-bold mt-8">Oh no! We’re sorry to see you go</h3>
      <div className="bodyMD text-gray-800 mt-1">
        Are you sure you want to cancel your subscription?
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ExitSurvey />
      </Suspense>
    </div>
  );
}
