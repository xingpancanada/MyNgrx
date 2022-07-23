import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';

// if want to set Action type, we can use below
// export interface ActionWithPayload<T> extends Action {
//   payload: T;
// }

const counterReducer = (state = 0, action: any) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

////14.15
const productsReducer = (state = [{}], action: any) => {
  switch (action.type) {
    case 'ADD':
      return [ ...state, {...action.payload}];
    case 'REMOVE':
      return state.filter((p: any) => p.id !== action.payload.id);
    case 'UPDATE':
      return state.map((p:any) => {
        if(p.id === action.payload.id){
          return {...p, ...action.payload};
        }else{
          return p;
        }
      });
    default:
      return state;
  }
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //14
    StoreModule.forRoot({
      counter: counterReducer,
      products: productsReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
