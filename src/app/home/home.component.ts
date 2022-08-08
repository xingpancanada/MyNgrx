import { ProductService } from './../services/product.service';
import { AppState } from './../Interfaces/AppState';
import { Product } from './../Interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CreateProductAction, DeleteProductAction, UpdateProductAction } from '../Actions/product.actions';

//16. Action Creator and Selectors
const productsSelector = (state: any) => state.products;

// const createProduct = (id: number, name: string) => ({
//   type: 'ADD',
//   payload: {
//     id,
//     name
//   }
// });

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'MyNgrx';

  counter$?: Observable<number>;
  products$?: Observable<Product[]>;
  error$?: Observable<any>;

  newProduct?: string;
  id = 0;

  selectedProduct?: Product | null;

 //14
  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ){
    this.counter$ = store.select('counter');
    //this.products$ = store.select('products');

    //16. Action Creator and Selectors
    this.products$ = this.store.select((state: any) => state.products);
    //this.products$ = this.store.select(productsSelector);
    // .pipe(
    //   tap(products => {
    //     console.log(products);
    //     if(products.length == 0 || products == undefined){
    //       this.products$ = this.productService.getProducts().pipe(
    //         tap(products => {
    //           console.log(products);
    //         })
    //       );

    //     }
    //   })
    // );

    //27
    // this.products$ = this.store.pipe(
    //   select(state => state.products)
    // );

    this.error$ = this.store.pipe(
      select(state => state.products)  //for error???
    )
  }

  ngOnInit(): void {
    /////27
    //this.store.dispatch({type: '[product] Fetch'});
    //this.store.dispatch(new FetchProductAction());
    // const ps = this.productService.getProducts().subscribe(resp => {
    //   console.log(resp);
    // });
    // console.log(ps);
  }

  addProduct(){
    // this.store.dispatch({
    //   type: 'ADD',
    //   payload: {
    //     name: this.newProduct,
    //     id: this.id++
    //   }
    // });

    //16. Action Creator and Selectors
    //this.store.dispatch(createProduct(this.id++, this.newProduct!));
    this.store.dispatch(new CreateProductAction({id:this.id++, name: this.newProduct}));

    this.newProduct = '';
  }

  delete(product: Product){
    // this.store.dispatch({
    //   type: 'REMOVE',
    //   payload: product
    // })
    this.store.dispatch(new DeleteProductAction(product));
  }

  select(product: Product){
    this.selectedProduct = {...product};
  }

  update(){
    // this.store.dispatch({
    //   type:'UPDATE',
    //   payload: this.selectedProduct
    // });

    this.store.dispatch(new UpdateProductAction(this.selectedProduct));

    this.selectedProduct = null;
  }
}
