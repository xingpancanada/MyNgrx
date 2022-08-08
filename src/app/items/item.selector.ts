import { ItemState } from './item-state';
////17. State in Feature Modules

import { createFeatureSelector, createSelector } from "@ngrx/store";


export const getItemsSelector = createFeatureSelector('items');  //call forFeature('items')

//16. Action Creator and Selectors --> copy 16 as reference
//this.products$ = this.store.select((state: any) => state.products);
//this.products$ = this.store.select(productsSelector);

export const getListSelector = createSelector(
  getItemsSelector,  //from this line get next line
  //because we use Feature, we need call from items, and then go to list
  (state: ItemState) => state?.list //get from upper line
);


//analyst global & not global for createSelector()
//global state
//{list: listReducer}  --> select(state => state.list)

//local state, use Feature
//select(state => state.items.list)
