
import { Action } from "@ngrx/store/src";
import { Product } from "../Interfaces/Product";

//16. Action Creators
// export enum ProductActionTypes {
//   Create = '[Product] Create',
//   Update = '[Product] Update',
//   Delete = '[Product] Delete',
//   Fetch = '[Product] Fetch',
//   Load = '[Product] Load',
//   FetchError = '[Product] FetchError',
// }

export const ProductCreate = '[Product] Create';
export const ProductUpdate = '[Product] Update';
export const ProductDelete = '[Product] Delete';
export const ProductFetch = '[Product] Fetch';
export const ProductLoad = '[Product] Load';
export const ProductFetchError = '[Product] FetchError';

export class CreateProductAction implements Action {
  //readonly type = ProductActionTypes.Create;
  readonly type = ProductCreate;
  constructor(public payload: Product) { }
}

export class UpdateProductAction implements Action {
  //readonly type = ProductActionTypes.Update;
  readonly type = ProductUpdate;
  constructor(public payload: Product) { }
}

export class DeleteProductAction implements Action {
  //readonly type = ProductActionTypes.Delete;
  readonly type = ProductDelete;
  constructor(public payload: Product) { }
}

export class FetchProductAction implements Action {
  //type = ProductActionTypes.Fetch;
  type = ProductFetch;
  //constructor(public payload: Product){}
}

export class LoadProductAction implements Action {
  //readonly type = ProductActionTypes.Load;
  readonly type = ProductLoad;
  constructor(public payload: Product){}
}

export class FetchErrorProductAction implements Action {
  //readonly type = ProductActionTypes.FetchError;
  readonly type = ProductFetchError;
  constructor(public payload: any){}
}

export type ProductActionUnion = CreateProductAction |
                                  UpdateProductAction |
                                  DeleteProductAction |
                                  FetchProductAction |
                                  LoadProductAction |
                                  FetchErrorProductAction;
