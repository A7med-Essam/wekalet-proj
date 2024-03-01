import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ManagerGuard } from './core/guards/manager.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutComponent } from './modules/web/layout/layout.component';
import { from } from 'rxjs';
import { LayoutDashboardModule } from './modules/admin/layout-dashboard.module';
import { AdminLayoutComponent } from './modules/admin/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/web/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/admin/layout-dashboard.module').then(
        (m) => m.LayoutDashboardModule
      ),
  },
  {
    path: 'steet-dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'steet-manager',
    loadChildren: () =>
      import('./modules/manager/manager.module').then((m) => m.ManagerModule),
    canActivate: [ManagerGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      // useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
