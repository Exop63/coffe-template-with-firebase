import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavMenuItem } from 'src/app/models/side-nav.model';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @ViewChild('drawer') matDrawer!: MatDrawer;

  get MenuItems(): NavMenuItem[] {
    return this.sideNavService.munu;
  }
  constructor(private sideNavService: SideNavService, private router: Router) {
    sideNavService.toogle.subscribe(isToggled => {
      this.matDrawer.toggle(isToggled);
    });
  }

  ngOnInit(): void {
  }
  navigate(url: string) {
    this.router.navigate([url]);
  }


}


