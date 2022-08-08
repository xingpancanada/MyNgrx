import { StartLoading, StopLoading } from './../app.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';
import { MaxState } from '../Interfaces/AppState';
import { Product } from '../Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
    {
      id: 1,
      name: "Ivanhoe"
    },
    {
      id: 2,
      name: "Three Musketeers"
    },
    {
      id: 3,
      name: "Robin Hood"
    }
  ];
  products$: Observable<Product[]>;

  saveCount = 0;
  updateCount = 0;

  constructor(
    private http: HttpClient,
    private store: Store<MaxState>
    ) {
      //this.getProducts();
    }

  saveProducts(action: never) {
    return of(`save attempt: ${this.saveCount++}`).pipe(
      delay(2000)
    );
  }


  getProducts() {
    this.store.dispatch(new StartLoading()); //max117

    let p = this.products;

    this.store.dispatch(new StopLoading());  //max117

    return this.products$ = of(p);
  }
}

