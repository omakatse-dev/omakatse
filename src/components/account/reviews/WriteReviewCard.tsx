import { LineItem, ProductVariant } from "@/types/admin.types";
import { Maybe } from "@/types/admin.types";

import Image from "next/image";
import Link from "next/link";

export default function WriteReviewCard({
  details,
}: {
  details: Pick<LineItem, "id" | "name"> & {
    image?: Maybe<{ url: string }>;
    variant?: Maybe<Pick<ProductVariant, "price">>;
  };
}) {
  console.log(details.id)
  return (
    <div className="flex w-full max-w-4xl items-center justify-between gap-8">
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
      <Link
        href={{
          pathname: "/account/write-review",
          query: {
            id: details.id,
            productName: details.name,
            imageUrl: details.image?.url,
            price: details.variant?.price
          }
        }}
        className="text-nowrap underline underline-offset-8 bodyButton"
      >
        Write a Review
      </Link>
    </div>
  );
}
