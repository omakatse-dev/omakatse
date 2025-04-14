import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function CancellationSuccessModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-primary/50 text-center">
      <div className="w-full mx-12 max-w-lg rounded-2xl bg-yellow-pastel px-12 py-8 flex flex-col items-center">
        <h4>Your subscription has been deactivated.</h4>
        <div className="bodyMD text-gray-800 mt-2">
          You&apos;ll receive a confirmation email shortly. When you return to
          your Subscription page, you&apos;ll see that auto-renewal is now
          turned off.
        </div>
        <div className="bodySM text-gray-800 mt-2">
          <b>Note: </b> If a next renewal date still appears, your deactivation
          was not successful.
        </div>
        <Button onClick={() => router.push("/account/profile")} className="mt-8">
          Back to my profile
        </Button>
      </div>
    </div>
  );
}
