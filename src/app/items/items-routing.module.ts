import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: ItemsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    //CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
