import { CartItemType, useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import { formatPrice } from "@/utils/Utils";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function SubscriptionCartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const handleRemoveItem = () => {
    removeItem(item);
  };
  return (
    <div className="flex gap-5 border-primary rounded-2xl p-4 relative">
      <XCircleIcon
        className="w-8 absolute -top-3 -left-3 text-primary fill-gray-50 cursor-pointer stroke-1.5"
        onClick={handleRemoveItem}
      />
      <Image
        src={item.image}
        alt={item.name}
        width={60}
        height={60}
        className="w-16 h-16 rounded-lg"
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="bodyMD font-semibold">Subscription Box</div>
        <div className="flex flex-col gap-2 bodySM text-gray-800">
          <div>Size: {item.name.split(" ")[0]}</div>
          <div>Duration: {item.duration}</div>
        </div>
        <div className="bodyLG self-end">
          AED {formatPrice(item.price)} / month
        </div>
      </div>
    </div>
  );
}
