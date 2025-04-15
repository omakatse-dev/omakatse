import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { subscribeToRestock } from "@/utils/RestockAPIs";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RestockFormData = {
  email: string;
};

export default function RestockModal({
  closeModal,
  variantId,
}: {
  closeModal: () => void;
  variantId: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestockFormData>();
  const onSubmit = async (data: RestockFormData) => {
    setStatus("loading");
    try {
      // call the restock api
      await subscribeToRestock(variantId.split("/").pop() || "", data.email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/40 w-full h-full z-10 flex justify-center items-center bodyMD"
      onClick={closeModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-yellow-pastel rounded-2xl px-12 pb-8 pt-16 flex flex-col gap-8 z-20 relative max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="w-6 absolute top-4 right-4 cursor-pointer stroke-2"
          onClick={closeModal}
        />
        {status === "idle" || status === "loading" ? (
          <>
            <h4>Email me when this is back in stock</h4>
            <div className="flex flex-col gap-2">
              <label className="self-start">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <Button type="submit" className="w-fit self-center">
              Join the waitlist
            </Button>
          </>
        ) : status === "success" ? (
          <div className="flex flex-col items-center">
            <h4>Thank you!</h4>
            <div className="mt-2">
              We will send you an email once the product is back in stock.
            </div>
            <Button
              className="mt-8"
              onClick={closeModal}
            >
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <h4>Something went wrong, please try again later</h4>
          </>
        )}
      </form>
    </div>
  );
}
