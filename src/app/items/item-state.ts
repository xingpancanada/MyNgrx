////17. State in Feature Modules

import { Item } from "../Interfaces/Item";

export interface ItemState{
  list: Item[];
  selectedItem: Item;
}
