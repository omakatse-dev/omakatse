import { createPortal } from 'react-dom';
import Button from '../common/Button';
import { removePet } from '@/utils/SubscriptionAPIs';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ConfirmRemovePetModal({
  name,
  close,
  contractId,
  petIndex
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
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/60"
      onClick={close}
    >
      <div
        className="bg-yellow-pastel relative flex w-full max-w-72 flex-col gap-6 rounded-2xl p-6 pt-12 text-center sm:max-w-lg sm:gap-8 sm:px-12 sm:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute top-4 right-4 w-6 cursor-pointer stroke-2"
          onClick={close}
        />
        <h4>Are you sure you want to remove {name}?</h4>
        <div className="grid w-full grid-cols-1 justify-center gap-2 sm:grid-cols-2">
          <Button
            bgColor="bg-yellow-pastel"
            className="w-full"
            variant="secondary"
            onClick={close}
          >
            No
          </Button>
          <Button
            className="w-full"
            onClick={handleRemovePet}
            loading={loading}
          >
            Yes, remove
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
