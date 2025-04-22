import Tag from "@/components/common/Tag";
import { ProductVariant } from "@/types/admin.types";
import { Option } from "@/types/Types";
import { getProductByVariantId } from "@/utils/APIs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoxItem({
  item,
}: {
  item: { variantId: string; quantity: number };
}) {
  const [product, setProduct] = useState<ProductVariant>();

  useEffect(() => {
    const getProduct = async () => {
      const res = await getProductByVariantId(
        "gid://shopify/ProductVariant/" + item.variantId
      );
      setProduct(res.node);
    };
    getProduct();
  }, [item.variantId]);

  const optionValues = product?.title?.split(" / ") || [];

  return (
    <>
      {!product ? (
        <div className="w-full h-24 rounded-md bg-gray-200 animate-pulse"></div>
      ) : (
        <Link
          href={"/shop/" + product?.product?.id.split("/").pop()}
          className="flex gap-5"
        >
          <Image
            src={product?.image?.url}
            alt={product?.title || ""}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md"
          />
          <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
            <div className="flex flex-col gap-2">
              <div className="font-semibold bodyMD">
                {product?.product?.title}
              </div>
              <div className="bodySM flex flex-col gap-1">
                {product?.product?.options?.map((opt: Option, idx: number) => (
                  <div key={opt.name}>
                    {opt.name}: {optionValues[idx]}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between h-fit md:w-1/4">
              <div className="bodyLG">x{item.quantity}</div>

              {product?.product?.metafield?.value === "true" ? (
                <Tag className="bg-green">Box Exclusive</Tag>
              ) : (
                <div className="bodyButton underline underline-offset-8">
                  Add to cart
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
