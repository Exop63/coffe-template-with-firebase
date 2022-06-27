import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IContact, IContactAddRequest } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: IContact = { htmlContent: '', id: '' };

  readonly PATH: string = "contact";
  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore) {
    this.getContact().subscribe(async value => {
      if (value.length != 0) {
        this.contact = value[0];
      } else {
        await this.addDefaultContract();
      }
    });
  }

  getContact(): Observable<IContact[]> {
    return this.firestore.collection<IContact>(this.PATH).valueChanges({ idField: 'id' })
  }
  async updateContact(id: string, contact: IContactAddRequest): Promise<void> {
    return await this.firestore.collection<IContactAddRequest>(this.PATH).doc(id).update(contact);
  }
  async addDefaultContract(): Promise<DocumentReference<IContactAddRequest>> {
    const contract: IContactAddRequest = {
      htmlContent: 'contract'
    };
    return await this.firestore.collection<IContactAddRequest>(this.PATH).add(contract);
  }
}
