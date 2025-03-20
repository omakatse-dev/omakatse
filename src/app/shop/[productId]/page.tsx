import ProductDetails from "@/components/shop/ProductPage/ProductDetails";
import OtherProducts from "@/components/shop/ProductPage/OtherProducts";
import { getProductDetailsByID } from "@/utils/APIs";

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
  console.log(relatedProducts);
  return (
    <div className="w-screen">
      <ProductDetails product={product} />
      <OtherProducts products={relatedProducts} />
    </div>
  );
}
