import CounterButton from "@/components/common/CounterButton";
import { CartItemType, useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/Utils";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
export default function RegularCartItem({ item }: { item: CartItemType }) {
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleQuantityChange = (quantity: number) => {
    changeQuantity(item, quantity);
  };
  const handleRemoveItem = () => {
    removeItem(item);
  };
  return (
    <div className="w-full flex flex-row gap-5">
      <div className="relative h-fit w-16 bg-white rounded-lg">
        <XCircleIcon
          className="w-6 absolute -top-2 -left-2 text-black fill-white cursor-pointer"
          onClick={handleRemoveItem}
        />
        <Image
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="bodyMD font-semibold">{item.name}</div>
        {item.options.length > 1 &&
          item.options.map((option) => (
            <div key={option.name} className="bodySM text-gray-800">
              {option.name}: {option.value}
            </div>
          ))}
        <div className="flex flex-row justify-between items-center mt-5 min-h-16">
          <CounterButton
            count={item.quantity}
            setCount={handleQuantityChange}
            min={1}
          />
          <div className="bodyLG">
            {item.compareAtPrice && (
              <div className="line-through text-gray-500">
                AED {formatPrice(item.compareAtPrice)}
              </div>
            )}
            <div>AED {formatPrice(item.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
