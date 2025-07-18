import { IOrderItem } from './IOrdenItem';

export interface IOrderCreated {
  items: IOrderItem[];
}

export interface IOrder {
  id: number;
  user_name: string;
  status: string;
  date_created: string;
  total_price: string;
  item: {
    product_id: number,
    product_name: string,
    product_price: number,
    quantity: number
  };
}
