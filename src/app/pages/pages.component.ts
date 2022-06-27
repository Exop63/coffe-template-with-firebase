import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  template: `       <!----Navbar-->
              <app-navbar></app-navbar>
              <router-outlet></router-outlet>
                    <!----Footer-->
              <app-footer></app-footer>`,
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
