import { Injectable, EventEmitter } from '@angular/core';
import { NavMenuItem } from '../models/side-nav.model';


@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  munu: NavMenuItem[] = [];

  isToggled = false;
  toogle: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.toogleNav();
    this.generateMenu();
  }

  toogleNav(): void {
    this.isToggled = !this.isToggled;
    this.toogle.emit(this.isToggled)
  }
  generateMenu() {
    this.munu = [
      {
        title: 'Business',
        icon: '',
        url: 'admin/panel/business'
      },
      {
        title: 'Sliders',
        icon: '',
        url: 'admin/panel/sliders'
      },
      {
        title: 'Products',
        icon: '',
        url: 'admin/panel/products'
      },
      {
        title: 'About',
        icon: '',
        url: 'admin/panel/about'
      },
      {
        title: 'Contact',
        icon: '',
        url: 'admin/panel/contact'
      }
    ]
  }
}
