import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutDashboardRoutingModule } from './layout-dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent, AdminLayoutComponent, LoginComponent],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    LayoutDashboardRoutingModule,
    FormsModule,
    FooterModule,
    NavbarModule,
    // SidebarModule,

    FixedPluginModule,
  ],
})
export class LayoutDashboardModule {}
