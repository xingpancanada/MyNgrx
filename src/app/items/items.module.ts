import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items.component';

import { reducers } from './../app.module';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectReducer, listReducer } from './item.reducer';
import { ItemState } from './item-state';
import { ItemsRoutingModule } from './items-routing.module';

////17. State in Feature Modules
const itemReducers: ActionReducerMap<ItemState> = {
  list: listReducer,
  selectedItem: selectReducer
}

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    BrowserModule,
    FormsModule,
    //17. State in Feature Modules
    StoreModule.forFeature('items', itemReducers),
  ],
  exports: [
    //ItemsComponent
  ]
})
export class ItemsModule { }
