"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import PastBoxCard from "@/components/account/past-boxes/PastBoxCard";
import { PastBoxDetailsType } from "@/types/Types";

export default function PastBoxPage({ box }: { box: PastBoxDetailsType }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8">
      <button
        onClick={() => router.push("/account/past-boxes")}
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </button>
      <h3>{dayjs(box.date).format("MMM, YYYY")}</h3>
      <PastBoxCard box={box} />
    </div>
  );
}
