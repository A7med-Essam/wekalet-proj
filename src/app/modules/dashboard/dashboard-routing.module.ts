import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ColorsComponent } from './colors/colors.component';
import { DashboardComponent } from './dashboard.component';
import { GenderComponent } from './gender/gender.component';
import { OrdersComponent } from './orders/orders.component';
import { InsertComponent as insertProduct } from './products/insert/insert.component';
import { ProductsComponent } from './products/products.component';
import { ShowComponent as productDetails } from './products/show/show.component';
import { ShowComponent as orderDetails } from './orders/show/show.component';
import { SizeComponent } from './size/size.component';

const routes: Routes = [
  { path: '', redirectTo: 'controls', pathMatch: 'full' },
  {
    path: 'controls',
    component: DashboardComponent,
  },
  {
    path: 'colors',
    children: [
      { path: '', component: ColorsComponent },
    ],
  },
  {
    path: 'sizes',
    children: [
      { path: '', component: SizeComponent },
    ],
  },
  {
    path: 'categories',
    children: [
      { path: '', component: CategoryComponent },
    ],
  },
  {
    path: 'genders',
    children: [
      { path: '', component: GenderComponent },
    ],
  },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersComponent },
      {
        path: 'details',
        component: orderDetails,
      },
    ],
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      {
        path: 'details',
        component: productDetails,
      },

      {
        path: 'insert',
        component: insertProduct,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
