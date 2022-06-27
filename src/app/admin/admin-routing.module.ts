import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AdminComponent } from "./admin.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { PanelComponent } from "./panel/panel.component";
import { ProductsComponent } from "./products/products.component";
import { SlidersComponent } from "./sliders/sliders.component";
import { BusinesComponent } from "./busines/busines.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      {
        path: 'panel', component: PanelComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'business' },
          { path: 'business', component: BusinesComponent },

          { path: 'sliders', component: SlidersComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
