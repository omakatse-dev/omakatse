export const runtime = "nodejs";

import ProductDetails from "@/components/shop/ProductPage/ProductDetails";
import { getProductDetailsByID } from "@/utils/APIs";
import { getReviewByProductID } from "@/utils/APIs";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductDetailsByID(productId);
  const relatedProducts = product.collections.nodes[0].products.nodes.filter(
    (p: { id: string }) => p.id !== product.id
  );

  const reviews = await getReviewByProductID(productId);
  return (
    <div className="w-screen flex flex-col items-center">
      <ProductDetails product={product} reviews={reviews.reviews} relatedProducts={relatedProducts}/>
    </div>
  );
}
