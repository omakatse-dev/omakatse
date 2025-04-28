import Tag from "@/components/common/Tag";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { ProductOption, ProductVariant } from "@/types/admin.types";
import { getProductByVariantId } from "@/utils/APIs";
import { formatPrice } from "@/utils/Utils";
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
            </div>
            <div className="flex justify-between h-fit md:w-1/4">
              <div className="bodyLG">x{item.quantity}</div>

              {product?.product?.metafield?.value === "true" ? (
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
