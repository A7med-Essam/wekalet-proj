import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from './shared/i18n/i18n.module';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {SkeletonModule} from 'primeng/skeleton';

export const ngxUiLoaderConfig: any = {
  bgsColor: '#2E36B2',
  bgsOpacity: 1,
  bgsPosition: 'bottom-right',
  bgsSize: 150,
  bgsType: 'ball-scale-multiple',
  blur: 15,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'rgba(0,0,0,0)',
  // "fgsColor": "#19a44b",
  fgsPosition: 'center-center',
  fgsSize: 20,
  fgsType: 'three-strings',
  gap: 25,
  logoPosition: 'center-center',
  logoSize: 80,
  // "logoUrl": "../../../assets/images/logo/LC_LOGO_(1).png",
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  // "overlayColor": "rgba(40, 40, 40, 0.8)",
  overlayColor: 'rgba(40, 40, 40, 0)',
  pbColor: '#2E36B2',
  pbDirection: 'ltr',
  pbThickness: 4,
  hasProgressBar: true,
  // "text": "Loading",
  textColor: '#2E36B2',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    AboutComponent,
    CheckoutComponent,
    CartComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    I18nModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderModule,
    SkeletonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private _I18nService: I18nService,
    public translate: TranslateService
  ) {
    this._I18nService.saveCurrentLang(this.translate);
  }
}
