import { FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { OrderState } from './order-state';
import { orderListReducer, orderSelectReducer } from './order.reducer';
import { OrderDetailComponent } from './order-detail/order-detail.component';

////17. State in Feature Modules
const orderReducers: ActionReducerMap<OrderState> = {
  list: orderListReducer,
  selectedOrder: orderSelectReducer
}

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    //17. State in Feature Modules
    StoreModule.forFeature('orders', orderReducers),
  ]
})
export class OrdersModule { }
