import CounterButton from '@/components/common/CounterButton';
import { CartItemType, useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/utils/Utils';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
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
    <div className="flex w-full flex-row gap-5">
      <div className="relative h-fit w-24 rounded-lg">
        <XCircleIcon
          className="text-primary stroke-1.5 absolute -top-3 -left-3 w-8 cursor-pointer fill-gray-50"
          onClick={handleRemoveItem}
        />
        <Image
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
          className="border-primary w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="bodyMD font-semibold">{item.name}</div>
        {item.options.length > 1 &&
          item.options.map((option) => (
            <div key={option.name} className="bodySM text-gray-800">
              {option.name}: {option.values?.[0]}
            </div>
          ))}
        <div className="mt-5 flex min-h-16 flex-row items-center justify-between">
          <CounterButton
            count={item.quantity}
            setCount={handleQuantityChange}
            min={1}
            className="max-w-40"
          />
          <div className="bodyLG">
            {item.compareAtPrice && (
              <div className="text-gray-500 line-through">
                AED{' '}
                {formatPrice(
                  (Number(item.compareAtPrice) * item.quantity).toString()
                )}
              </div>
            )}
            <div>
              AED {formatPrice((Number(item.price) * item.quantity).toString())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
