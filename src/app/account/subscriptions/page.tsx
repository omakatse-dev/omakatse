import SubscriptionList from '@/components/account/subscriptions/SubscriptionList';
import React, { Suspense } from 'react';
export default function SubscriptionsPage() {
  return (
    <div>
      <h2 className="text-primary hidden lg:block">My Subscriptions</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionList />
      </Suspense>
    </div>
  );
}
