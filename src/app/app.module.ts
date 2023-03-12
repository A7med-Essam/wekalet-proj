import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, NotFoundComponent, HomeComponent, ProductsComponent],
  imports: [BrowserModule, AppRoutingModule
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
