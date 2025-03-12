export interface ProductInterface {
  id: string;
  title: string;
  description:string;
}

export interface ProductEdgeInterface {
  node: ProductInterface;
}