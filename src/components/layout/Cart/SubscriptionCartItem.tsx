import { CartItemType, useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import { formatPrice } from '@/utils/Utils';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
export default function SubscriptionCartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const handleRemoveItem = () => {
    removeItem(item);
  };
  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;

  return (
    <div className="border-primary relative flex gap-5 rounded-2xl p-4">
      <XCircleIcon
        className="text-primary stroke-1.5 absolute -top-3 -left-3 w-8 cursor-pointer fill-gray-50"
        onClick={handleRemoveItem}
      />
      <Image
        src={item.image}
        alt={item.name}
        width={60}
        height={60}
        className="h-16 w-16 rounded-lg"
      />
      <div className="flex w-full flex-col gap-4">
        <div className="bodyMD font-semibold">Subscription Box</div>
        <div className="bodySM flex flex-col gap-2 text-gray-800">
          <div>Size: {item.name.split(' ')[0]}</div>
          <div>Duration: {item.duration}</div>
          <div>
            No of pets:
            {catCount > 0 && ` ${catCount} cat(s)`}
            {catCount > 0 && dogCount > 0 && ','}
            {dogCount > 0 && ` ${dogCount} dog(s)`}
          </div>
        </div>
        <div className="bodyLG self-end">
          AED {formatPrice(item.price)} / month
        </div>
      </div>
    </div>
  );
}
