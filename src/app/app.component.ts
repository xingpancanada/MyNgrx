
import { ProductService } from './services/product.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState, MaxState } from './Interfaces/AppState';
import { Observable, tap } from 'rxjs';
import { Product } from './Interfaces/Product';
import { LoadProductAction, FetchProductAction, ProductFetch } from './Actions/product.actions';

// //16. Action Creator and Selectors
// const productsSelector = (state: any) => state.products;

// // const createProduct = (id: number, name: string) => ({
// //   type: 'ADD',
// //   payload: {
// //     id,
// //     name
// //   }
// // });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'MyNgrx';

  isLoading$: Observable<Boolean>;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ){ }

//   counter$?: Observable<number>;
products$?: Observable<Product[]>;

//   newProduct?: string;
//   id = 0;

//   selectedProduct?: Product | null;

//  //14
//   constructor(
//     private store: Store<AppState>
//   ){
//     this.counter$ = store.select('counter');
//     //this.products$ = store.select('products');

//     //16. Action Creator and Selectors
//     //this.products$ = this.store.select((state: any) => state.products);
//     this.products$ = this.store.select(productsSelector);
//   }

  ngOnInit(): void {
    //debugger;
    //this.store.dispatch({type: 'START_LOADING'});
    // if(this.products$){
    //   this.products$ = this.store.select(state => state.products);
    //   console.log('get from Store');
    // }else{
    //   this.products$ = this.productService.getProducts();
    //   console.log('get from Service');
    // }
    //this.products$ = this.productService.products$;
    this.store.dispatch({type: ProductFetch});
    //this.store.dispatch(new FetchProductAction()); //don't use this new function
    //this.store.dispatch({type: 'STOP_LOADING'});
    //this.store.subscribe(resp => console.log(resp));
    this.isLoading$ = this.store.select(state => state.maxApp.isLoading).pipe(
      tap(resp => console.log(resp))
    );

  }

//   addProduct(){
//     // this.store.dispatch({
//     //   type: 'ADD',
//     //   payload: {
//     //     name: this.newProduct,
//     //     id: this.id++
//     //   }
//     // });

//     //16. Action Creator and Selectors
//     //this.store.dispatch(createProduct(this.id++, this.newProduct!));
//     this.store.dispatch(new CreateProductAction({id:this.id++, name: this.newProduct}));

//     this.newProduct = '';
//   }

//   delete(product: Product){
//     // this.store.dispatch({
//     //   type: 'REMOVE',
//     //   payload: product
//     // })
//     this.store.dispatch(new DeleteProductAction(product));
//   }

//   select(product: Product){
//     this.selectedProduct = {...product};
//   }

//   update(){
//     // this.store.dispatch({
//     //   type:'UPDATE',
//     //   payload: this.selectedProduct
//     // });

//     this.store.dispatch(new UpdateProductAction(this.selectedProduct));

//     this.selectedProduct = null;
//   }
}
