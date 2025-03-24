"use client";

import Tag from "@/components/common/Tag";
import { LineItem, Product, ProductVariant } from "@/types/admin.types";
import { Maybe } from "@/types/admin.types";
import { Review } from "@/types/Types";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

export default function WriteReviewCard({
  details,
  review,
}: {
  details: Pick<LineItem, "id" | "name"> & {
    image?: Maybe<{ url: string }>;
    variant?: Maybe<
      Pick<ProductVariant, "price"> & {
        product: Pick<Product, "id">;
      }
    >;
  };
  review: Review | undefined;
}) {
  const statusColorMap = {
    PENDING: "bg-yellow",
    APPROVED: "bg-green",
    REJECTED: "bg-pink",
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  console.log(details.variant);

  return (
    <div className="flex w-full max-w-4xl items-center justify-between gap-8 first:pb-8 not-first:py-8">
      <div className="flex gap-4">
        <Image
          src={details.image?.url || ""}
          alt={details.name}
          width={60}
          height={60}
          className="h-15 rounded-md border-primary"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold bodyMD">{details.name}</p>
          <p className="bodyLG">AED {details.variant?.price}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {review && (
          <Tag className={`${statusColorMap[review.status]} text-center`}>
            {review.status}
          </Tag>
        )}
        {review ? (
          <div
            onClick={() => setShowReviewModal(true)}
            className="text-nowrap underline underline-offset-8 bodyButton cursor-pointer"
          >
            View Review
          </div>
        ) : (
          <Link
            href={{
              pathname: "/account/write-review",
              query: {
                id: details.id,
                productName: details.name,
                imageUrl: details.image?.url,
                price: details.variant?.price,
                productId: details.variant?.product.id,
              },
            }}
            className="text-nowrap underline underline-offset-8 bodyButton"
          >
            Write a Review
          </Link>
        )}
      </div>
      {showReviewModal && review && (
        <ReviewModal
          review={review}
          handleClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}
