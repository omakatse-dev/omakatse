import { getProductDetailsByID } from "@/app/utils/APIs";
import ProductDetails from "@/components/shop/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductDetailsByID(productId);
  // console.log(product.collections.nodes[0].products.nodes)
  return <ProductDetails product={product} />;
}
