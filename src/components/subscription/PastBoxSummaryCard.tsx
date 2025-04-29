"use client";

import Tag from "@/components/common/Tag";
import Image from "next/image";
import Button from "@/components/common/Button";
import { PastBoxType } from "@/types/Types";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

// This card will receive boxid or box as prop
export default function PastBoxSummaryCard({ box }: { box: PastBoxType }) {
  return (
    <div className="flex flex-col bg-white rounded-xl sm:rounded-[1.25rem] p-6 sm:p-8 items-center">
      <Tag className="mb-3">Shipped</Tag>
      <h4>{dayjs(box.date).format("MMM YYYY")}</h4>
      {/* <div className="bodyMD mb-3">
        Box {box.number} out of {duration}
      </div> */}
      <Image
        src="/assets/box_image.svg"
        alt="Box"
        width={200}
        height={200}
        className="mb-3"
      />
      <Button
        variant="primary"
        className="w-full sm:w-fit"
        onClick={() => {
          redirect(`/account/past-boxes/${box.boxId}`);
        }}
      >
        View Box
      </Button>
    </div>
  );
}
