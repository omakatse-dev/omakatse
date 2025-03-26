import { getContracts } from "@/utils/APIs";

export default async function SubscriptionsPage() {
  const contracts = await getContracts();
  console.log(contracts);
  return (
    <div>
      <h1>My Subscriptions</h1>
    </div>
  );
}
