import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function ReviewCompletedModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 w-screen h-screen bg-primary/50 flex items-center justify-center">
      <div className="bg-yellow-pastel rounded-2xl px-12 py-8 max-w-md flex flex-col items-center text-center relative">
        <h4 className="mt-7">Thank you for reviewing this product</h4>
        <div className="bodyMD mt-2 text-gray-800">
          Our team will process the review and feature it on the product page
        </div>
        <Button
          onClick={() => router.push("/account/reviews")}
          className="mt-8"
        >
          Go back to Reviews
        </Button>
      </div>
    </div>
  );
}
