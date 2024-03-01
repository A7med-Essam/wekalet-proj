import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from 'src/app/pages/navbar/navbar.component';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastModule } from 'primeng/toast';
import { ngxUiLoaderConfig } from 'src/app/app.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductDetailsComponent } from 'src/app/pages/product-details/product-details.component';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    //
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    AboutComponent,
    CheckoutComponent,
    CartComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ToastModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderModule,
    I18nModule,
    SkeletonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SliderModule,
    DialogModule,
    ConfirmDialogModule,
  ],
})
export class LayoutModule {}
