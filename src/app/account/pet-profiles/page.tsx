import PetProfilePage from "@/components/account/pet-profiles/PetProfilePage";
import { getPetProfilesByEmail } from "@/utils/SubscriptionAPIs";
import { getUserProfileData } from "../history/page";

export default async function page() {
  const user = await getUserProfileData();
  const contracts = await getPetProfilesByEmail(user.email);
  return <PetProfilePage contracts={contracts} />;
}
