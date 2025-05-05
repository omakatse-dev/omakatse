export const runtime = 'nodejs';

import { getOrdersByEmail } from '@/utils/APIs';

import { Claims, getSession } from '@auth0/nextjs-auth0';
import MobilePastOrders from '@/components/account/history/MobilePastOrders';
import PastOrdersTable from '@/components/account/history/PastOrdersTable';
import Button from '@/components/common/Button';
import Link from 'next/link';

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
      <h2 className="text-primary hidden lg:mb-8 lg:block">Payment History</h2>
      {pastOrders?.length > 0 ? (
        <div>
          <MobilePastOrders pastOrders={pastOrders ?? []} />
          <PastOrdersTable pastOrders={pastOrders ?? []} />
        </div>
      ) : (
        <>
          <div className="bodyMD text-gray-800">
            No payments yet. Your payment history will appear here after your
            first subscription or purchase.
          </div>
          <Link href="/subscribe/step-1">
            <Button className="mt-10 w-full sm:w-fit">
              Build your box now
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
