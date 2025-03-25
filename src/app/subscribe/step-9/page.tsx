"use client";

import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import ProgressBar from "@/components/subscription/ProgressBar";
// import SubscriptionOptions from "@/components/subscription/SubscriptionOptions";
import TipCard from "@/components/subscription/TipCard";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useCartStore } from "@/stores/cartStore";
const subscriptionSchema = subscriptionFormSchema.pick({
  boxSize: true,
  duration: true,
});

type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

export default function SubscriptionStepNinePage() {
  const router = useRouter();
  const setData = useSubscriptionFormStore((state) => state.setData);
  const storedBoxSize = useSubscriptionFormStore((state) => state.boxSize);
  const storedDuration = useSubscriptionFormStore((state) => state.duration);
  const addItem = useCartStore((state) => state.addItem);

  const { handleSubmit, watch, setValue } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      boxSize: storedBoxSize || "small",
      duration: storedDuration || "trial",
    },
  });

  const boxSize = watch("boxSize");
  const onSubmit = (data: SubscriptionSchema) => {
    setData(data);
    //TODO need to find a way to add the notes to the item
    addItem({
      id: "gid://shopify/ProductVariant/46680266211587", //this is the variant id
      name: "Subscription Box",
      price: "0",
      compareAtPrice: "",
      quantity: 1,
      image: "https://images.omakatsepets.com/subscription-box-small.png",
      options: [],
    });
    console.log("here");
  };

  const handleSelectBox = (value: string) => {
    setValue("boxSize", value === "Small Box" ? "small" : "large");
    setData({ boxSize: value === "Small Box" ? "small" : "large" });
  };

  return (
    <div className="w-full pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={9} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>Choose your plan</h3>
        <div>For subscriptions, your box will be delivered to you monthly.</div>
      </div>
      <Tabs
        tabs={["Small Box", "Large Box"]}
        selectedTab={boxSize === "small" ? "Small Box" : "Large Box"}
        onChange={(tab) => handleSelectBox(tab)}
        className="bg-gray-200"
      />
      <TipCard />
      {/* <SubscriptionOptions control={control} name="duration" /> */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-8")}
          variant="secondary"
          type="button"
        >
          Previous
        </Button>
        <Button type="submit">Add to cart</Button>
      </form>
    </div>
  );
}
