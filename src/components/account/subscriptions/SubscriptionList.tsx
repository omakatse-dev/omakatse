"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSubscriptions } from "@/utils/SubscriptionAPIs";
import { SubscriptionContract } from "@/types/Types";
import SubscriptionCard from "./SubscriptionCard";
import { usePathname, useSearchParams } from "next/navigation";
import RenewSubscriptionCard from "./RenewSubscriptionCard";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function SubscriptionList() {
  const { user, error, isLoading } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(
    []
  );
  const [loadingSubs, setLoadingSubs] = useState(true);
  const pathname = usePathname();
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
  const isRenewSubscription = pathname.includes("/renew-subscription");
  if (!contractId && isRenewSubscription)
    return <div>No contract ID found.</div>;

  const subscriptionToRenew = subscriptions.filter(
    (sub) => sub.contractId === contractId
  );

  return (
    <div className="md:mt-8 flex flex-col gap-8 w-full">
      {isRenewSubscription ? (
        <RenewSubscriptionCard subscription={subscriptionToRenew[0]} />
      ) : (
        subscriptions.map((sub) => (
          <SubscriptionCard key={sub.contractId} subscription={sub} />
        ))
      )}
      {subscriptions.length === 0 && !loadingSubs && (
        <>
          <div className="bodyMD text-gray-800">
            No subscriptions yet. Start building your very first box and treat
            your furry family members to something special every month.
          </div>
          <Link href="/subscribe/step-1">
            <Button className="w-full sm:w-fit">Build your box now</Button>
          </Link>
        </>
      )}
    </div>
  );
}
