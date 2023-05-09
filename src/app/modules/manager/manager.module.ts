import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ProductControlsComponent } from './product-controls/product-controls.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [ProductControlsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    TableModule,
    ImageModule,
    ConfirmDialogModule,
  ],
})
export class ManagerModule {}
