import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { PanelComponent } from './panel/panel.component';
import { SlidersComponent } from './sliders/sliders.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddRoductDialogComponent } from './dialogs/add-roduct-dialog/add-roduct-dialog.component';
import { BusinesComponent } from './busines/busines.component';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    LogoutComponent,
    PanelComponent,
    SlidersComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    AddRoductDialogComponent,
    BusinesComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
