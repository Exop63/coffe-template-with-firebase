import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  get contact(): IContact { return this.contactService.contact; }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

}
