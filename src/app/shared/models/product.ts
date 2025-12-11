export interface Product {
  id: string;
  name: string;
  description: string;
  urlImg: string;
  reviews: number;
  price: number;
  previousPrice: number | null;
  category?: string;
  sku?: string;
}
