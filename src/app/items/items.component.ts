import { getListSelector } from './item.selector';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Item } from '../Interfaces/Item';
import { ItemState } from './item-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  newItem: string;
  id = 0;

  constructor(private store: Store<ItemState>) {
    this.items$ = this.store.select(getListSelector);
  }

  ngOnInit(): void {}

  createItem(){
    this.store.dispatch({
      type: '[Item] add',
      payload: { title: this.newItem, id: this.id++ }
    });
  }
}
