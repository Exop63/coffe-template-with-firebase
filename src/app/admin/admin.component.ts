import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SideNavService } from '../services/side-nav.service';

@Component({
  selector: 'admin',
  template: `
  <mat-toolbar color="primary">
    <button  *ngIf="authService.IsAdmin()" (click)="toogle()" mat-button>
  <mat-icon ></mat-icon>
    <mat-icon>menu</mat-icon>
  </button>
<ng-container *ngIf="authService.IsAdmin() else logginButton">
  <button mat-button [matMenuTriggerFor]="userMenu">
  <mat-icon aria-hidden="false" aria-label="Example home icon"></mat-icon>
    Admin
    <mat-icon>expand_more</mat-icon>
  </button>
</ng-container>
<ng-template #logginButton>
  <button mat-button routerLink="login">
    <mat-icon>login</mat-icon>
    login
  </button>
</ng-template>
</mat-toolbar>
<div >
  <router-outlet></router-outlet>
</div>
<mat-menu #userMenu="matMenu">
  <button mat-menu-item (click)="logout()">Logout</button>
</mat-menu>

  `,
})
export class AdminComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private sideNavService: SideNavService) {


  }

  ngOnInit(): void {
  }
  async logout() {
    await this.authService.SignOut();
    this.router.navigate(['admin']);

  }
  toogle(): void {
    this.sideNavService.toogleNav();
  }
}
