"use client";

import Button from "@/components/common/Button";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
export default function EditPetSuccessModal() {
  const router = useRouter();
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-20">
      <div className="bg-yellow-pastel p-6 sm:py-8 sm:px-12 rounded-2xl flex flex-col gap-6 sm:gap-8 max-w-72 text-center sm:max-w-none">
        <h4>Your pet profile has been updated!</h4>
        <Button onClick={() => router.back()}>
          Back to pet profile
        </Button>
      </div>
    </div>,
    document.body
  );
}
