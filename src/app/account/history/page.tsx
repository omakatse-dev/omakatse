export const runtime = "nodejs";

import { getOrdersByEmail } from "@/utils/APIs";

import { Claims, getSession } from "@auth0/nextjs-auth0";
import MobilePastOrders from "@/components/account/history/MobilePastOrders";
import PastOrdersTable from "@/components/account/history/PastOrdersTable";

export const getUserProfileData = async (): Promise<Claims> => {
  const session = await getSession();

  if (!session) {
    throw new Error(`Requires authentication`);
  }

  const { user } = session;

  return user;
};

export default async function AccountHistoryPage() {
  const user = await getUserProfileData();
  const pastOrders = (await getOrdersByEmail(user.email)) || [];

  return (
    <>
      <h2 className="hidden lg:block lg:mb-8">Payment History</h2>
      {pastOrders?.length > 0 ? (
        <div>
          <MobilePastOrders pastOrders={pastOrders ?? []} />
          <PastOrdersTable pastOrders={pastOrders ?? []} />
        </div>
      ) : (
        <div>No past orders found</div>
      )}
    </>
  );
}
