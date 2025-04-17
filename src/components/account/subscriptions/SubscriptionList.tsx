'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client'; 
import { getSubscriptions } from "@/utils/SubscriptionAPIs"; 
import { SubscriptionContract } from "@/types/Types";
import SubscriptionCard from './SubscriptionCard';
import { usePathname } from 'next/navigation';
import RenewSubscriptionCard from './RenewSubscriptionCard';

export default function SubscriptionList() {
  const { user, error, isLoading } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const pathname = usePathname();     

  useEffect(() => {
    if (user?.email) {
      setLoadingSubs(true);
      getSubscriptions(user.email)
        .then(data => {
          setSubscriptions(data.results);
          setLoadingSubs(false);
        })
        .catch(err => {
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
  const isRenewSubscription = pathname.includes('/renew-subscription');

  return (
    <div className="mt-8 flex flex-col gap-8">
      {subscriptions.map((subscription: SubscriptionContract) => (
        isRenewSubscription ? (
          <RenewSubscriptionCard
            key={subscription.contractId}
            subscription={subscription}
          />
        ) : (
          <SubscriptionCard
            key={subscription.contractId}
            subscription={subscription}
          />
        )
      ))}
      {subscriptions.length === 0 && !loadingSubs && <div>No subscriptions found.</div>}
    </div>
  );
}