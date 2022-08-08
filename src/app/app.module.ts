
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppState } from './Interfaces/AppState';
import { Product } from './Interfaces/Product';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RouterSerializer } from './router-serializer';
import { RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { EffectService } from './services/effect.service';
import { CounterEffectService } from './services/counter-effect.service';
import { ProductEffectService } from './services/product-effect.service';
import { maxAppReducer, getIsLoading } from './app.reducer';
import { ProductActionUnion, ProductCreate, ProductDelete, ProductFetch, ProductFetchError, ProductLoad, ProductUpdate } from './Actions/product.actions';


// if want to set Action type, we can use below
// export interface ActionWithPayload<T> extends Action {
//   payload: T;
// }

//22.
// what props we will sync to localStorage `counter`, `router`
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['counter', 'router'], rehydrate: true })(reducer)
}

//Developers can think of meta-reducers as hooks into the action->reducer pipeline.
//Meta-reducers allow developers to pre-process actions before normal reducers are invoked.
const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];


const counterReducer = (state = 0, action: any) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

////16. Action Creators
const productsReducer = (state: Product[] = [], action: ProductActionUnion | any) => {
  switch (action.type) {
    case ProductCreate:
      return [ ...state, {...action.payload}];
    case ProductDelete:
      return state.filter((p: any) => p.id !== action.payload.id);
    case ProductUpdate:
      return state.map((p:any) => {
        if(p.id === action.payload.id){
          return {...p, ...action.payload};
        }else{
          return p;
        }
      });
    //case '[product] Fetch':
    case ProductFetch:
      return [...state];
    //case '[product] Load':
    case ProductLoad:
      return [...state, ...action.payload];  //makes state.products is array
    case ProductFetchError:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

// ////14.15
// const productsReducer = (state = [{}], action: any) => {
//   switch (action.type) {
//     case 'ADD':
//       return [ ...state, {...action.payload}];
//     case 'REMOVE':
//       return state.filter((p: any) => p.id !== action.payload.id);
//     case 'UPDATE':
//       //// 1 --> messes up order
//       // let product = state.find((p: any) => p.id === action.payload.id);
//       // product = { ...product, ...action.payload };  //spread operator: {..., ...} --> merge (replace same key and add different key)

//       // const products = state.filter((p: any) => p.id !== action.payload.id);
//       // return [
//       //   product,
//       //   ...products
//       // ];  //spread operator: [..., ...] --> merge value

//       ////2 --> better, preserves order
//       return state.map((p:any) => {
//         if(p.id === action.payload.id){
//           return {...p, ...action.payload};
//         }else{
//           return p;
//         }
//       });
//     default:
//       return state;
//   }
// };


////16.Action Creators: Use ActionReduceMap to do reducers collection
////max116
export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  counter: counterReducer,
  router: routerReducer,  //22.
  maxApp: maxAppReducer
}

////don't use below for production setting for reduxdevtool
// ////21.//sanitize: show sth. in the debug tool
// const actionSanitizer = (action, id) => {
//   const newAction = { ...action, payload: 'hiding the payload'};
//   return newAction;
// };

// const stateSanitizer = (state, index) => {
//   const maskedState = { ...state, list: ['showing obscured state']}
//   return maskedState;
// };

// const devInstrument = {
//   maxAge: 20,
//   name: 'my dev instance'
// };

// const prodInstrument = {
//   maxAge: 20,
//   name: 'my PROD instance',
//   actionSanitizer,   //sanitize: show sth. in the debug tool
//   stateSanitizer
// };



@NgModule({
  declarations: [
    AppComponent,
    //ItemsComponent,
    HomeComponent,
    //OrdersComponent,  //17
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    //ItemsModule,  //17 --> go to lazy loading
    ////14
    // StoreModule.forRoot({
    //   counter: counterReducer,
    //   products: productsReducer,
    //   items: itemsReducer
    // }),
    ////16.Action Creators: Use ActionReduceMap to do reducers collection
    StoreModule.forRoot(reducers, {metaReducers}),  //22.metaReducers
    //MAX115
    //StoreModule.forRoot({ui: appReducer}),
    //StoreModule.forRoot({maxApp: maxAppReducer}, {metaReducers}),
    ////21. my method: don't use storedevtools when production
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 10, //save how many state changes
    }),
    ////22.
    //RouterModule.forRoot(routes, { enableTracing: false }),  //already imported by AppRoutingModule
    StoreRouterConnectingModule.forRoot(),
    ////25.26
    EffectsModule.forRoot([EffectService, ProductEffectService, CounterEffectService])
  ],
  providers: [
    //24. Writing Custom Serializer
    {provide: RouterStateSerializer, useClass: RouterSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
