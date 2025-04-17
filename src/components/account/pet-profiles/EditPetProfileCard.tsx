import Card from "@/components/common/Card";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import PetProfileForm from "./PetProfileForm";
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function EditPetProfileCard({
  existingDetails,
}: {
  existingDetails: PetDetailsSchema;
}) {

  console.log(existingDetails)
  return (
    <Card className="bg-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-row sm:flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-yellow" />
          <h4>{existingDetails.name}</h4>
        </div>
        <PetProfileForm existingDetails={existingDetails} />
      </div>
    </Card>
  );
}
