<<<<<<< HEAD
export type SortOption = 'CREATED' | 'BEST_SELLING' | 'PRICE';


=======
>>>>>>> main
type PriceRange = {
    minVariantPrice: {
        amount: number;
    }
}

type Metafield = {
    key: string;
    value: string;
}

export type ShopfrontProduct = {
    id: string;
    title: string;
    description: string;
    compareAtPriceRange: PriceRange;
    featuredImage: {
        url: string;
    };
    priceRange: PriceRange;
    tags: string[];
    metafields: Metafield[];
}
<<<<<<< HEAD

export type ProductSearchResultType = {
    id: string;
    title: string;
    priceRange: PriceRange;
    featuredImage: {
        url: string;
    };
}
=======
>>>>>>> main
