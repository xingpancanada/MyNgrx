////17. State in Feature Modules

import { Order } from "../Interfaces/Order";

export interface OrderState{
  list: Order[];
  selectedOrder: Order;
}
