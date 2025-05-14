'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getSubscriptions } from '@/utils/SubscriptionAPIs';
import { SubscriptionContract } from '@/types/Types';
import SubscriptionCard from './SubscriptionCard';
import { usePathname, useSearchParams } from 'next/navigation';
import RenewSubscriptionCard from './RenewSubscriptionCard';
import Link from 'next/link';
import Button from '@/components/common/Button';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function SubscriptionList() {
  const { user, error, isLoading } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(
    []
  );
  const [loadingSubs, setLoadingSubs] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contractId = searchParams.get('contractId');

  useEffect(() => {
    if (user?.email) {
      setLoadingSubs(true);
      getSubscriptions(user.email)
        .then((data) => {
          setSubscriptions(data.results);
          setLoadingSubs(false);
        })
        .catch((err) => {
          console.error('Failed to fetch subscriptions:', err);
          setLoadingSubs(false);
        });
    } else if (!isLoading && !user) {
      setLoadingSubs(false);
    }
  }, [user, isLoading]);

  if (isLoading || loadingSubs)
    return <LoadingSkeleton className="mt-8 h-164" />;
  if (error) return <div>Error loading user: {error.message}</div>;
  if (!user) return <div>Please log in to view subscriptions.</div>;
  const isRenewSubscription = pathname.includes('/renew-subscription');
  if (!contractId && isRenewSubscription)
    return <div>No contract ID found.</div>;

  const subscriptionToRenew = subscriptions.filter(
    (sub) => sub.contractId === contractId
  );

  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      {isRenewSubscription ? (
        <RenewSubscriptionCard subscription={subscriptionToRenew[0]} />
      ) : (
        subscriptions.map((sub) => (
          <SubscriptionCard key={sub.contractId} subscription={sub} />
        ))
      )}
      {subscriptions.length === 0 && !loadingSubs && (
        <>
          <div className="bodyMD flex flex-col gap-8 text-gray-800">
            <p>
              No subscriptions yet. Start building your very first box and treat
              your furry family members to something special every month.
            </p>
            <p>
              If you&apos;ve already placed an order, our team will process it
              after checkout. It won&apos;t appear on your profile immediately,
              so please check back in 4-5 working days to view your
              subscription.
            </p>
          </div>
          <Link href="/subscribe/step-1">
            <Button className="w-full sm:w-fit">Build Your Box Now</Button>
          </Link>
        </>
      )}
    </div>
  );
}
