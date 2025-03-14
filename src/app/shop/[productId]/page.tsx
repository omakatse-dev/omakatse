import { getProductDetailsByID } from "@/app/utils/APIs";
import ProductDetails from "@/components/shop/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = await getProductDetailsByID(productId);
  return <ProductDetails product={product} />;
}
