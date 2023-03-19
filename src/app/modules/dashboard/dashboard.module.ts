import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CategoryComponent } from './category/category.component';
import { GenderComponent } from './gender/gender.component';
import { SizeComponent } from './size/size.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ColorsComponent } from './colors/colors.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ShowComponent as productsDetails } from './products/show/show.component';
import { ShowComponent as OrderDetails } from './orders/show/show.component';
import { InsertComponent } from './products/insert/insert.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    GenderComponent,
    SizeComponent,
    OrdersComponent,
    ProductsComponent,
    ColorsComponent,
    OrderDetails,
    productsDetails,
    InsertComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InputTextModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    MultiSelectModule,
    ConfirmDialogModule,
  ],
})
export class DashboardModule {}
