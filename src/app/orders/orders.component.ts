import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../Interfaces/Order';
import { OrderState } from './order-state';
import { getListSelector } from './order.selector';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  newOrder: string;
  id = 0;
  ordersTest = [
    {id: 1, title: 'Order TEST 1'},
    {id: 2, title: 'Order TEST 2'},
    {id: 3, title: 'Order TEST 3'},
  ];

  constructor(
    private store: Store<OrderState>,
    private router: Router
    ) {
    this.orders$ = this.store.select(getListSelector);
  }

  ngOnInit(): void {}

  goDetail(ot: any){
    this.router.navigateByUrl(`/orders/${ot.id}`);
  }

  createOrder(){
    this.store.dispatch({
      type: '[Order] add',
      payload: { title: this.newOrder, id: this.id++ }
    });
  }

}
