import { Component, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  get Business(): IBusiness { return this.businessService.business; }
  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
  }

}
