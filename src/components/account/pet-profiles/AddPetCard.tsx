"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { redirect } from "next/navigation";

export default function AddPetCard() {
  return (
    <Card variant="grey" className="bg-white flex flex-col sm:flex-row items-center sm:justify-between">
      <div className="flex flex-col items-center sm:w-2/3 sm:items-start">
        <h4>Have a new pet?</h4>
        <div className="bodyMD font-semibold text-center sm:text-start mt-2">
          Add a new pet to your subscription (maximum 4 pets)
        </div>
      </div>
      <Button onClick={() => redirect("/contact")} className="mt-4 w-full sm:w-fit">
        Contact Us
      </Button>
    </Card>
  );
}
