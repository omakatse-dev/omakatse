import { createPortal } from "react-dom";
import Button from "../common/Button";
import { removePet } from "@/utils/SubscriptionAPIs";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ConfirmRemovePetModal({
  name,
  close,
  contractId,
  petIndex,
}: {
  name: string;
  close: () => void;
  contractId: string;
  petIndex: number;
}) {
  const [loading, setLoading] = useState(false);
  const handleRemovePet = async () => {
    setLoading(true);
    await removePet(contractId, petIndex);
    window.location.reload();
  };
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-20"
      onClick={close}
    >
      <div
        className="bg-yellow-pastel p-6 pt-12 sm:py-8 sm:px-12 rounded-2xl flex flex-col gap-6 sm:gap-8 max-w-72 sm:max-w-md text-center w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute w-6 top-4 right-4 stroke-2 cursor-pointer"
          onClick={close}
        />
        <h4>Are you sure you want to remove {name}?</h4>
        <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
          <Button
            bgColor="bg-yellow-pastel"
            className="w-1/2"
            variant="secondary"
            onClick={close}
          >
            No
          </Button>
          <Button className="w-1/2" onClick={handleRemovePet} loading={loading}>
            Yes, remove
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
