import Tag from "@/components/common/Tag";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { ProductOption, ProductVariant } from "@/types/admin.types";
import { Review } from "@/types/Types";
import { getProductByVariantId, getReviewByProductID } from "@/utils/APIs";
import { formatPrice } from "@/utils/Utils";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoxItem({
  item,
}: {
  item: { variantId: string; quantity: number };
}) {
  const [product, setProduct] = useState<ProductVariant>();
  const [ratings, setRatings] = useState<number>(0);
  const fullStars = Math.floor(ratings);
  const partialFill = ratings % 1;
  useEffect(() => {
    const getProduct = async () => {
      const res = await getProductByVariantId(
        "gid://shopify/ProductVariant/" + item.variantId
      );
      console.log(res.node.product.tags);
      setProduct(res.node);
      const reviews = await getReviewByProductID(
        res.node.product.id.split("/").pop() || ""
      );
      const rating =
        reviews.reviews.reduce(
          (acc: number, review: Review) => acc + review.rating,
          0
        ) / reviews.reviews.length;
      console.log(rating);
      if (isNaN(rating)) {
        setRatings(0);
      } else {
        setRatings(rating);
      }
    };

    getProduct();
  }, [item.variantId]);

  const optionValues = product?.title?.split(" / ") || [];
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUIStore((state) => state.openCart);

  const addToCartHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // if item is already in cart, update the quantity
    const item = useCartStore
      .getState()
      .items.find((item) => item.id === product?.id);
    if (item) {
      changeQuantity(item, item.quantity + 1);
    } else {
      addItem({
        id: product?.id || "", //this is the variant id
        name: product?.title || "",
        price: product?.price.amount || "",
        compareAtPrice: product?.compareAtPrice?.amount || "",
        quantity: 1,
        image: product?.image?.url || "",
        options: product?.product?.options || [],
      });
    }
    openCart();
  };

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
                {product?.product?.options?.map(
                  (opt: ProductOption, idx: number) => (
                    <div key={opt.name}>
                      {opt.name}: {optionValues[idx]}
                    </div>
                  )
                )}
              </div>
              <div className="bodyLG flex gap-2">
                <div> AED {formatPrice(product.price.amount)}</div>
                <div className="line-through text-gray-500">
                  AED {formatPrice(product.compareAtPrice.amount)}
                </div>
              </div>
              {ratings > 0 && (
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="relative">
                      <StarIcon
                        className={`w-5 h-5 ${
                          index < fullStars ? "text-yellow" : "text-gray-200"
                        }`}
                      />
                      {index === fullStars && partialFill > 0 && (
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${partialFill * 100}%` }}
                        >
                          <StarIcon className="w-5 h-5 text-yellow" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between h-fit md:w-1/4">
              <div className="bodyLG">x{item.quantity}</div>

              {product?.product?.tags?.includes("Box Exclusive") ? (
                <Tag className="bg-green">Box Exclusive</Tag>
              ) : (
                <div
                  className="bodyButton underline underline-offset-8"
                  onClick={addToCartHandler}
                >
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
