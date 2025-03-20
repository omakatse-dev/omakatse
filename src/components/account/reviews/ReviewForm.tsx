"use client";
import Input from "@/components/common/Input";
import Textfield from "@/components/common/Textfield";
import StarInput from "./StarInput";
import UploadImageButton from "./UploadImageButton";
import TnC from "./TnC";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import { useSearchParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "@/utils/APIs";
import { useState } from "react";
import ReviewCompletedModal from "./ReviewCompletedModal";

// type ReviewFormData = {
//   name: string;
//   email: string;
//   title: string;
//   review: string;
//   rating: number;
//   image: string | null;
//   lineItemId: string;
// };

const schema = z.object({
  rating: z.number().min(1, "Please rate this product"),
  title: z.string().min(1, "Title is required"),
  review: z.string().min(20, "Review must be at least 20 characters"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  lineItemId: z.string().optional(),
});

type ReviewFormData = z.infer<typeof schema>;

export default function ReviewForm() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const lineItemId = searchParams.get("id") || "";
  const [isUploadingReview, setIsUploadingReview] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      lineItemId: lineItemId.split("/").pop(),
    },
    resolver: zodResolver(schema),
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    console.log(data);
    // TODO: submit reivew on judge.me
    setIsUploadingReview(true);
    const reviewPayload = {
      name: data.name,
      email: user?.email || "",
      title: data.title,
      rating: data.rating,
      body: data.review,
      id: data.lineItemId || "",
      shop_domain: "ii4nnv-1i.myshopify.com",
      platform: "shopify",
      picture_urls: [data.image || ""],
      // shop_domain: process.env.NEXT_PUBLIC_JUDGE_SHOP_DOMAIN || "",
    };

    const res = await createReview(reviewPayload);
    console.log(res);
    setIsUploadingReview(false);
    setIsReviewSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="gap-2 flex flex-col bodyMD text-gray-800">
          <label>Name</label>
          <Input
            placeholder="Name"
            className="w-full border-primary"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red">Name is required</p>}
        </div>
        <div className="gap-2 flex flex-col bodyMD text-gray-800">
          <label>Title</label>
          <Input
            placeholder="My pets love it!"
            className="w-full border-primary"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red">Title is required</p>}
        </div>
        <div className="gap-2 flex flex-col bodyMD text-gray-800">
          <label>Write your Review</label>
          <Textfield
            placeholder="We would like to hear what your pets say about this product"
            className="w-full border-primary h-24"
            {...register("review", { required: true, minLength: 20 })}
          />
          {errors.review && (
            <p className="text-red">
              Review is required and must be at least 20 characters
            </p>
          )}
        </div>
        <div className="bodyMD flex items-center gap-3">
          Rate the product
          <StarInput
            value={rating}
            onChange={(value) =>
              setValue("rating", value, {
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />
          {errors.rating && (
            <p className="text-red">Please rate this product</p>
          )}
        </div>
        <UploadImageButton onChange={(file) => setValue("image", file)} />
        <TnC />
        <Button
          type="submit"
          className="w-full sm:w-fit sm:px-16"
          disabled={isUploadingReview}
        >
          {isUploadingReview ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {isReviewSubmitted && <ReviewCompletedModal />}
    </>
  );
}
