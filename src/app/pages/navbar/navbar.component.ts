import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IBusiness } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = true;
  get Business(): IBusiness {
    return this.businessService.business;
  }
  constructor(private businessService: BusinessService) {

  }

}
