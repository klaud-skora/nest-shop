export interface Product {
  name: string;
  desc: string;
  price: number;
}

export type GetProductsListRes = Product[];

export type GetOneProductRes = Product;

export type CreatedNewProduct = Product;

export interface GetPaginatedListOfProductsResponse {
  pages: number;
  totalNumberOfItems: number;
  items: Product[];
}
