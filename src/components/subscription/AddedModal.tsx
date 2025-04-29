import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../common/Button";
import { createCart } from "@/utils/APIs";
import { useCartStore } from "@/stores/cartStore";

interface PetDetail {
  [key: string]: string | number | boolean;
}

export default function AddedModal({ close }: { close: () => void }) {
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
              ...petDetails.state.dogDetails.map((detail: PetDetail) => ({
                ...detail,
                type: "Dog",
              })),
              ...petDetails.state.catDetails.map((detail: PetDetail) => ({
                ...detail,
                type: "Cat",
              })),
            ]
          : undefined,
      duration: subscriptionItems[0].duration,
    };

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
      <div className="p-8 sm:p-12 rounded-2xl bg-yellow-pastel w-11/12 sm:w-full sm:max-w-lg text-center relative flex flex-col gap-8">
        <XMarkIcon
          className="w-6 h-6 absolute top-4 right-4 stroke-2 cursor-pointer"
          onClick={close}
        />
        <h4>You have already added the subscription to your cart</h4>
        <ul className="list-disc list-inside bodyMD text-gray-800">
          <li>You can only checkout one subscription at a time</li>
          <li>
            Remove your existing subscription if you want to change anything
          </li>
        </ul>
        <Button onClick={createCartHandler}>Checkout</Button>
      </div>
    </div>
  );
}
