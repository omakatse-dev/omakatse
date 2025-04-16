import SubscriptionList from "@/components/account/subscriptions/SubscriptionList";

export default function SubscriptionsPage() {
  return (
    <div>
      <h2 className="hidden lg:block">My Subscriptions</h2>
      <SubscriptionList />
    </div>
  );
}
