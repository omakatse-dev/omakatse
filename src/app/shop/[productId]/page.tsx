export const runtime = "edge";

import ProductDetails from "@/components/shop/ProductPage/ProductDetails";
import OtherProducts from "@/components/shop/ProductPage/OtherProducts";
import { getProductDetailsByID } from "@/utils/APIs";
import { getReviewByProductID } from "@/utils/APIs";
import ReviewSection from "@/components/shop/ProductPage/ReviewsSection";

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
  console.log(reviews);
  return (
    <div className="w-screen flex flex-col items-center">
      <ProductDetails product={product} />
      <ReviewSection reviews={reviews.reviews} />
      <OtherProducts products={relatedProducts} />
    </div>
  );
}
