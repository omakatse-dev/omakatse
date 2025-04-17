"use client";

import Card from "@/components/common/Card";
import Link from "next/link";

export default function AddPetCard() {
  return (
    <Card variant="grey" className="bg-white flex flex-col sm:flex-row items-center sm:justify-between">
      <div className="flex flex-col items-center sm:w-2/3 sm:items-start">
        <h4>Have a new pet?</h4>
        <div className="bodyMD font-semibold text-center sm:text-start mt-2">
          Add a new pet to your subscription (maximum 4 pets)
        </div>
      </div>
      <Link
        href="/contact"
        className="bodyButton mt-4 underline underline-offset-8"
      >
        Add a pet
      </Link>
    </Card>
  );
}
