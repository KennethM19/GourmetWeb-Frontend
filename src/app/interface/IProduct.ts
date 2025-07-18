export interface IProduct {
  id: number;
  description: string;
  name: string;
  price: number;
  image: string | null;
  available: boolean;
  cant_available: number;
  date_created: string;
  productType: {
    id: number;
    type: string;
  };
}