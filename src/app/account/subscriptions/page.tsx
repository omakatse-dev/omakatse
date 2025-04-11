import { getSession } from "@auth0/nextjs-auth0";
import { getSubscriptions } from "@/utils/SubscriptionAPIs";
import SubscriptionCard from "@/components/account/subscriptions/SubscriptionCard";
import { SubscriptionContract } from "@/types/Types";
export default async function SubscriptionsPage() {
  // Add await here
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    // Handle not logged in state
    return <div>Please log in</div>;
  }

  const subscriptions = await getSubscriptions(user.email);

  return (
    <div>
      <h2 className="hidden sm:block">My Subscriptions</h2>
      <div className="mt-8">
        {subscriptions.results.map((subscription: SubscriptionContract) => (
          <SubscriptionCard key={subscription.contractId} subscription={subscription} />
        ))}
      </div>
    </div>
  );
}
