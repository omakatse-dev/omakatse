import React from 'react';
import Button from '../common/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
import { useRouter } from 'next/navigation';

export default function ContinueModal({ close }: { close: () => void }) {
  const clearData = useSubscriptionFormStore((state) => state.clearData);
  const router = useRouter();
  const restartHandler = () => {
    clearData();
    close();
    router.push('/subscribe/step-1');
    // Force a page reload to clear any cached state
    // window.location.reload();
  };

  return (
    <div
      className="bg-primary/50 fixed inset-0 z-10 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-yellow-pastel relative flex w-11/12 max-w-xl flex-col items-center gap-8 rounded-2xl p-6 pt-10 text-center sm:w-full sm:px-16 sm:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer stroke-2"
          onClick={close}
        />
        <h4>Would you like to resume your subscription journey?</h4>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
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
