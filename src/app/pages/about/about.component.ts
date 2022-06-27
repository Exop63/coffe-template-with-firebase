import { Component, OnInit } from '@angular/core';
import { IAbout } from 'src/app/models/about.model';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  get about(): IAbout { return this.aboutService.about; }

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
  }

}
