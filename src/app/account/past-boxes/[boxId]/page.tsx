import PastBoxPage from "@/components/account/past-boxes/PastBoxPage";
import { getPastBoxById } from "@/utils/SubscriptionAPIs";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
export default async function page({
  params,
}: {
  params: Promise<{ boxId: string }>;
}) {
  const { boxId } = await params;
  const box = await getPastBoxById(boxId);
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <PastBoxPage box={box} />
      </Suspense>
    </>
  );
}
