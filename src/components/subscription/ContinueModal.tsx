import React from "react";
import Button from "../common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
export default function ContinueModal({ close }: { close: () => void }) {
  
  const router = useRouter();
  const clearData = useSubscriptionFormStore((state) => state.clearData);

  const restartHandler = () => {
    clearData();
    router.push("/subscribe/step-1");
    close();
  };
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-primary/50"
      onClick={close}
    >
      <div
        className="w-11/12 sm:w-full max-w-xl rounded-2xl bg-yellow-pastel p-6 pt-10 sm:px-16 sm:py-8 gap-8 flex flex-col items-center relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer stroke-2"
          onClick={close}
        />
        <h4>Would you like to resume your subscription journey?</h4>
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button
            variant="secondary"
            bgColor="bg-yellow-pastel"
            className="w-full sm:w-1/2"
            onClick={restartHandler}
          >
            No, restart
          </Button>
          <Button onClick={close} className="w-full sm:w-1/2">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
