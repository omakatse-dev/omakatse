import Button from "@/components/common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FreeShippingTracker from "./FreeShippingTracker";
import { useCartStore } from "@/stores/cartStore";
import RegularCartItem from "./RegularCartItem";
import { formatPrice } from "@/utils/Utils";
import { createCart } from "@/utils/APIs";
export default function Cart({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const regularCartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const createCartHandler = async () => {
    const formattedItems = cartItems.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity,
    }));
    const res = await createCart(formattedItems);
    window.open(res.checkoutUrl, "_blank");
    //TODO this should only be done once the payment goes through
    clearCart();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-20 ${
          !isOpen ? "hidden" : "block"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 w-full sm:w-[440px] h-screen bg-yellow-pastel z-30 px-6 flex flex-col items-center p-8 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row justify-between w-full border-b border-gray-400 pb-4">
          <div className="flex flex-row items-center">
            <div className="bodyLG font-semibold">Cart</div>
          </div>
          <XMarkIcon
            className="w-6 cursor-pointer stroke-2"
            onClick={handleClose}
          />
        </div>
        {regularCartItems.length > 0 ? (
          <>
            <FreeShippingTracker amountMore={100 - totalPrice} />
            <div className="flex flex-col gap-8 mt-8">
              {regularCartItems.map((item) => (
                <RegularCartItem key={item.name} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="bodyMD font-semibold mt-8">
            No items in the cart yet, start shopping!
          </div>
        )}

        <div className="absolute bottom-8 w-full flex flex-col items-center px-6">
          <div className="bodySM text-gray-500">
            Shipping is calculated at checkout
          </div>
          <Button
            className="w-full mt-3 py-4"
            disabled={regularCartItems.length === 0}
            onClick={createCartHandler}
          >
            Checkout - AED {formatPrice(totalPrice.toString())}
          </Button>
        </div>
      </div>
    </>
  );
}
