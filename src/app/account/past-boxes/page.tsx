import { PastBoxType } from "@/types/Types";
import PastBoxSummaryCard from "@/components/subscription/PastBoxSummaryCard";
import { getPastBoxesByEmail } from "@/utils/SubscriptionAPIs";
import { Claims, getSession } from "@auth0/nextjs-auth0";
import Button from "@/components/common/Button";

const getUserProfileData = async (): Promise<Claims> => {
  const session = await getSession();
  if (!session) {
    throw new Error(`Requires authentication`);
  }
  const { user } = session;
  return user;
};

export default async function PastBoxesPage() {
  const user = await getUserProfileData();
  const contracts = await getPastBoxesByEmail(user.email);
  console.log(contracts);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="hidden lg:block">Past Boxes</h2>
      {Object.keys(contracts).length > 0 ? (
        <div className="flex flex-col gap-16">
          {Object.keys(contracts).map((contractId, idx) => (
            <div key={contractId} className="flex flex-col gap-4">
              <h4>Subscription {idx + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contracts[contractId].map((box: PastBoxType) => (
                  <PastBoxSummaryCard key={box.boxId} box={box} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bodyMD text-gray-800">
            No past boxes yet. Once you’ve built and received your first box,
            you’ll see it here!
          </div>
          <Button className="w-full sm:w-fit">Build your box now</Button>
        </>
      )}
    </div>
  );
}
