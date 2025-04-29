import PetProfilePage from "@/components/account/pet-profiles/PetProfilePage";
import { getPetProfilesByEmail } from "@/utils/SubscriptionAPIs";
import { getUserProfileData } from "../history/page";
import { ContractType } from "@/types/Types";

export default async function page() {
  const user = await getUserProfileData();
  const contracts = await getPetProfilesByEmail(user.email);
  const activeContracts = contracts.filter(
    (contract: ContractType) => contract.status === "ACTIVE"
  );
  return <PetProfilePage contracts={activeContracts} />;
}
