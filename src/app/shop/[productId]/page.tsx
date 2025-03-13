import { getProductDetailsByID } from "@/app/utils/APIs";
import ProductDetails from "@/components/shop/ProductDetails";

export default async function ProductPage({ params }: { params: { productId: string } }) {
    const { productId } = await params;
    const res = await getProductDetailsByID(productId);
    return (
        <div className='mt-32 h-full'>
            <ProductDetails productID={productId}/>
        </div>
    )
} 
