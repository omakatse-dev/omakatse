"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSubscriptions } from "@/utils/SubscriptionAPIs";
import { SubscriptionContract } from "@/types/Types";
import { useSearchParams } from "next/navigation";
import PetDetailsCard from "@/components/subscription/PetDetailsCard";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function PetListForContract() {
  const { user, error, isLoading } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(
    []
  );
  const [loadingSubs, setLoadingSubs] = useState(true);
  const searchParams = useSearchParams();
  const contractId = searchParams.get("contractId");

  useEffect(() => {
    if (user?.email) {
      setLoadingSubs(true);
      getSubscriptions(user.email)
        .then((data) => {
          setSubscriptions(data.results);
          setLoadingSubs(false);
        })
        .catch((err) => {
          console.error("Failed to fetch subscriptions:", err);
          setLoadingSubs(false);
        });
    } else if (!isLoading && !user) {
      setLoadingSubs(false);
    }
  }, [user, isLoading]);

  if (isLoading || loadingSubs) return <div>Loading...</div>;
  if (error) return <div>Error loading user: {error.message}</div>;
  if (!user) return <div>Please log in to view subscriptions.</div>;

  const subscription = subscriptions.find(
    (sub) => sub.contractId === contractId
  );

  if (!subscription) {
    return <div>No subscription found for the provided contract ID.</div>;
  }

  let pets = [];
  try {
    pets = JSON.parse(subscription.pets || "[]"); // Safely parse the pets string
  } catch (err) {
    console.error("Failed to parse pets:", err);
    return <div>Invalid pet data for this subscription.</div>;
  }
  console.log(pets)
  return (
    <div className="mt-8 flex flex-wrap gap-8 justify-center">
      {pets.length > 0 ? (
        pets.map((pet: PetDetailsSchema, idx: number) => (
          <div key={idx}>
            <PetDetailsCard
              details={pet}
              idx={idx}
              editMode={true}
              petType={pet.type === "Dog" ? "dogsDetails" : "catsDetails"}
            />
          </div>
        ))
      ) : (
        <div>No pets found for this subscription.</div>
      )}
    </div>
  );
}
