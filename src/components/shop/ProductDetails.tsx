import ProductTitle from "./ProductPage/ProductTitle";
import ProductDescription from "./ProductPage/ProductDescription";
import ProductImages from "./ProductPage/ProductImages";
import { ProductDetailsType, Review } from "@/types/Types";
import ReviewsCard from "./ProductPage/ReviewsSection";
export default function ProductDetails({
  product,
  reviews,
}: {
  product: ProductDetailsType;
  reviews: Review[];
}) {
  return (
    <div className="flex flex-col pt-10 pb-20 w-screen max-w-7xl mt-32">
      <div className="pt-10 pb-15 flex gap-25 w-full">
        <div className="flex flex-col gap-15 w-1/2">
          <ProductImages images={product.images} />
          {product.metafield && (
            <ProductDescription description={product.metafield.value} />
          )}
        </div>
        <ProductTitle className="sticky top-52 h-fit" details={product} />
      </div>
      <ReviewsCard reviews={reviews} />
    </div>
  );
}
