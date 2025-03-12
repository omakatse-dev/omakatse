import { getProductsByCollection } from '@/app/utils/APIs';
import CatProducts from '@/components/shop/CatProducts';

export default async function page() {
    const { products, categories } = await getProductsByCollection("441832374531")
    return (
        <CatProducts products={products} categories={categories} />
    )
}
