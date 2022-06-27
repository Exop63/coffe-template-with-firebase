import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IAbout, IAboutAddRequest } from '../models/about.model';
import { IBanner, IBannerAddRequest } from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  about: IAbout = { htmlContent: '', id: '' };

  readonly PATH: string = "about";
  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore) {
    this.getAbout().subscribe(async value => {
      if (value.length != 0) {
        this.about = value[0];
      } else {
        await this.addDefaultAbout();
      }
    });
  }

  getAbout(): Observable<IAbout[]> {
    return this.firestore.collection<IAbout>(this.PATH).valueChanges({ idField: 'id' })
  }
  async updateAbout(id: string, about: IAboutAddRequest): Promise<void> {
    return await this.firestore.collection<IAboutAddRequest>(this.PATH).doc(id).update(about);
  }

  async addDefaultAbout(): Promise<DocumentReference<IAboutAddRequest>> {
    const about: IAboutAddRequest = {
      htmlContent: 'About'
    };
    return await this.firestore.collection<IAboutAddRequest>(this.PATH).add(about);
  }
}
