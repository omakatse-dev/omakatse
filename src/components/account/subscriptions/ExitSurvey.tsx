"use client";

import PillButton from "@/components/common/PillButton";
import { useForm, Controller } from "react-hook-form";
import Textfield from "@/components/common/Textfield";
import Button from "@/components/common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  deactivateSubscription,
  saveExitSurveyData,
} from "@/utils/SubscriptionAPIs";
import CancellationSuccessModal from "./CancellationSuccessModal";

type ExitSurveyForm = {
  reason: string;
  customReason?: string;
  returnRating: number;
  comments: string;
};

const REASONS = [
  "Product issue",
  "Didn't know it was a subscription",
  "Too expensive",
  "Shipping issues",
  "Poor customer support",
  "Taking a break but will be back",
  "Bought as a gift",
  "Only wanted 1 box",
  "Box comes too frequently",
  "My pets don't like the products",
  "Other reasons",
] as const;

export default function ExitSurvey() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExitSurveyForm>();

  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "pending">(
    "pending"
  );
  const searchParams = useSearchParams();
  const contractId = searchParams.get("contractId");
  const email = searchParams.get("email");

  if (!contractId) {
    router.push("/");
  }

  const onSubmit = async (data: ExitSurveyForm) => {
    setStatus("loading");
    try {
      await saveExitSurveyData(
        email || "",
        data.reason,
        data.customReason || "",
        data.returnRating,
        data.comments
      );
      await deactivateSubscription(contractId || "");
      setStatus("success");
    } catch {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bodyMD">
        <div>Select a reason for deactivating your subscription</div>
        <Controller
          name="reason"
          control={control}
          rules={{ required: "Please select a reason" }}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {REASONS.map((reason) => (
                <PillButton
                  active={field.value === reason}
                  key={reason}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    field.onChange(reason);
                  }}
                >
                  {reason}
                </PillButton>
              ))}
            </div>
          )}
        />

        {watch("reason") === "Other reasons" && (
          <Controller
            name="customReason"
            control={control}
            rules={{ required: "Please provide your reason" }}
            render={({ field }) => (
              <Textfield
                {...field}
                className="col-span-2 mt-4 w-full"
                placeholder="Enter your reason here"
              />
            )}
          />
        )}
        {errors.reason && (
          <div className="text-red bodyM mt-2">{errors.reason.message}</div>
        )}
        <div className="mt-10">
          <div>How likely are you to return?</div>
          <Controller
            name="returnRating"
            control={control}
            rules={{ required: "Please provide a rating" }}
            render={({ field }) => (
              <div className="w-full md:w-2/3 flex flex-col gap-1">
                <div className="flex justify-between w-full mt-8">
                  {[...Array(10)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        field.onChange(i + 1);
                      }}
                      className={`h-7 w-7 md:h-12 md:w-12 rounded-full border border-black cursor-pointer ${
                        field.value === i + 1 && "bg-yellow"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between bodySM text-gray-500">
                  <div>No Chance</div>
                  <div>Absolutely Will!</div>
                </div>
              </div>
            )}
          />
          {errors.returnRating && (
            <div className="text-red bodyMD">{errors.returnRating.message}</div>
          )}
        </div>

        <div className="mt-8">
          <div className="bodyMD text-gray-800">
            Anything else you&apos;d like to share about your experience that
            might help us improve? (Optional)
          </div>
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <Textfield
                {...field}
                className="mt-4 w-full"
                placeholder="Enter any additional comments"
              />
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-8 mt-8">
          <Button
            type="submit"
            variant="secondary"
            loading={status === "loading"}
          >
            Cancel subscription
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/account/subscriptions")}
          >
            Keep subscription
          </Button>
        </div>
      </form>
      {status === "success" && <CancellationSuccessModal />}
    </>
  );
}
