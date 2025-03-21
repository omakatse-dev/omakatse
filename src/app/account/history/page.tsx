export const runtime = "nodejs";

import { getOrdersByEmail } from "@/utils/APIs";

import { Claims, getSession } from "@auth0/nextjs-auth0";
import MobilePastOrders from "@/components/account/history/MobilePastOrders";
import PastOrdersTable from "@/components/account/history/PastOrdersTable";

const getUserProfileData = async (): Promise<Claims> => {
  const session = await getSession();

  if (!session) {
    throw new Error(`Requires authentication`);
  }

  const { user } = session;

  return user;
};

export default async function AccountHistoryPage() {
  const user = await getUserProfileData();
  const pastOrders = await getOrdersByEmail(user.email);

  return (
    <div>
      <MobilePastOrders pastOrders={pastOrders ?? []} />
      <PastOrdersTable pastOrders={pastOrders ?? []} />
    </div>
  );
}
