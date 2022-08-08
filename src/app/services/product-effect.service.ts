import { ProductFetch, ProductLoad } from './../Actions/product.actions';

import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from "rxjs";
import { LoadProductAction } from '../Actions/product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductEffectService {


  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  ////reference: how to use normal service
  // @Effect({ dispatch: false}) saveProducts$ = this.actions$.pipe(
  //   ofType('SAVE_PRODUCTS'),
  //   concatMap((action) => this.srv.saveProducts(action)),   ////action == product
  //   tap((arg) => console.log(arg))
  // )

  // counter$ = createEffect(() => (
  //   this.actions$.pipe(
  //     ofType('INCREMENT'),
  //     tap(action => console.log('increment happened:', action))
  //   )
  // ), {dispatch: false});

  //27
  product$ = createEffect(() => (
    this.actions$.pipe(
      ofType(ProductFetch),
      //ofType(new LoadProductAction()),
      switchMap(() => this.productService.getProducts().pipe(
        map((products:any) => ({type: ProductLoad, payload: products, loading: false})),
        catchError(error => this.handleError(error))
      ))
    ))
  );

  private handleError(err) {
    let message = '';
    if(err.status > 400 && err.status < 500) {
      message = "You've messed up";
    } else if(err.status >=500 && err.status <=599) {
      message = "We've messed up";
    }
    console.log(`Url: ${err.url} Error message: ${err.statusText}`);

    return of(({ type: "FETCH_PRODUCTS_ERROR", payload: message }));
  }
}
