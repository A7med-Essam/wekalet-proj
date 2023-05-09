import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductControlsComponent } from './product-controls/product-controls.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-controls', pathMatch: 'full' },
  {
    path: 'product-controls',
    component: ProductControlsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
