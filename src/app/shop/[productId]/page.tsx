import ProductDetails from "@/components/shop/ProductDetails";

export default async function ProductPage({ params }: { params: { productId: string } }) {
    const { productId } = await params;

    return (
        <div className='mt-32 h-full'>
            <ProductDetails productID={productId}/>
        </div>
    )
} 
