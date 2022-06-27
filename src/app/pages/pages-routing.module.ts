import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { MenupageComponent } from "./menupage/menupage.component";
import { PagesComponent } from "./pages.component";


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'menu/:id', component: MenupageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
