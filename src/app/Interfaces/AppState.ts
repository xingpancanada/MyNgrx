import { Item } from './Item';
import { Product } from './Product';

export interface AppState
{
  counter: number;
  products: Product[];
  router: any;   //22.
  maxApp: MaxState;
}

//MAX 150
export interface MaxState{
  isLoading: boolean;
}
