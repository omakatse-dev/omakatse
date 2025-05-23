import Button from "@/components/common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FreeShippingTracker from "./FreeShippingTracker";
import { useCartStore } from "@/stores/cartStore";
import RegularCartItem from "./RegularCartItem";
import { formatPrice } from "@/utils/Utils";
import { createCart } from "@/utils/APIs";
import SubscriptionCartItem from "./SubscriptionCartItem";

interface PetDetail {
  [key: string]: string | number | boolean;
}

export default function Cart({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalCompareAtPrice = useCartStore(
    (state) => state.totalCompareAtPrice
  );
  const cartItems = useCartStore((state) => state.items);

  const subscriptionItems = cartItems.filter((item) =>
    item.name.includes("Subscription")
  );
  const regularItems = cartItems.filter(
    (item) => !item.name.includes("Subscription")
  );
  const createCartHandler = async () => {
    const formattedRegularItems = regularItems.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity,
    }));

    const formattedSubscriptionItems = subscriptionItems.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity,
      sellingPlanId: item.sellingPlanId,
    }));

    const petDetails = JSON.parse(
      localStorage.getItem("subscription-storage") || "{}"
    );
    const note = {
      pets:
        petDetails.state.petType === "dog"
          ? petDetails.state.dogsDetails.map((detail: PetDetail) => ({
              ...detail,
              type: "Dog",
            }))
          : petDetails.state.petType === "cat"
          ? petDetails.state.catsDetails.map((detail: PetDetail) => ({
              ...detail,
              type: "Cat",
            }))
          : petDetails.state.petType === "both"
          ? [
              ...petDetails.state.dogsDetails.map((detail: PetDetail) => ({
                ...detail,
                type: "Dog",
              })),
              ...petDetails.state.catsDetails.map((detail: PetDetail) => ({
                ...detail,
                type: "Cat",
              })),
            ]
          : undefined,
          duration: subscriptionItems?.[0]?.duration || 'No Duration',    };
    try {
      const res = await createCart(
        formattedRegularItems.concat(formattedSubscriptionItems),
        formattedSubscriptionItems.length > 0 ? JSON.stringify(note) : undefined
      );
      localStorage.setItem("cartId", res.id);
      window.open(res.checkoutUrl, "_blank");
    } catch (error) {
      console.log("something went wrong creating cart", error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-primary/50 z-20 ${
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
        {cartItems.length > 0 ? (
          <>
            <FreeShippingTracker amountMore={100 - totalPrice} />
            <div className="flex flex-col gap-8 mt-8 mb-24 w-full p-4 overflow-y-auto no-scrollbar">
              {regularItems.map((item) => (
                <RegularCartItem key={item.id} item={item} />
              ))}
              {subscriptionItems.map((item) => (
                <SubscriptionCartItem key={item.name} item={item} />
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
            className="w-full mt-3"
            disabled={cartItems.length === 0}
            onClick={createCartHandler}
          >
            <div className="flex gap-2">
              Checkout - AED {formatPrice(totalPrice?.toString() || "0")}
              {totalCompareAtPrice > 0 && (
                <div className="line-through text-gray-500">
                  AED {formatPrice(totalCompareAtPrice?.toString())}
                </div>
              )}
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
