'use client'; 

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client'; 
import { getSubscriptions } from "@/utils/SubscriptionAPIs"; 
import { SubscriptionContract } from "@/types/Types";
import SubscriptionCard from './SubscriptionCard';

export default function SubscriptionList() {
  const { user, error, isLoading } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);

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
          // Handle error display
        });
    } else if (!isLoading && !user) {
        setLoadingSubs(false);
    }
  }, [user, isLoading]); 

  if (isLoading || loadingSubs) return <div>Loading...</div>; 
  if (error) return <div>Error loading user: {error.message}</div>;
  if (!user) return <div>Please log in to view subscriptions.</div>; 

  return (
    <div className="mt-8">
      {subscriptions.map((subscription: SubscriptionContract) => (
        <SubscriptionCard
          key={subscription.contractId}
          subscription={subscription}
        />
      ))}
      {subscriptions.length === 0 && !loadingSubs && <div>No subscriptions found.</div>}
    </div>
  );
}