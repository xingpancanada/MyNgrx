import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  //{path:'home', component: HomeComponent},
  //{path:'items', component: ItemsComponent},
  {path:'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)}, //lazy loading
  {path:'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)}, //lazy loading
  {path:'**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
