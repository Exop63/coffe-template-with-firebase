import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, validateEventsArray } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IBusiness, IBusinessAddRequest } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  business: IBusiness = {
    id: 'asdlkds12',
    social: [],
    whatsapNumber: '+905522425295',
    brandImage: '',
    brandImageUrl: '',
    brandName: 'Özderk'
  };
  readonly PATH: string = "business";
  private basePath = '/business';
  isLoading: boolean = false;
  onValueChange: EventEmitter<IBusiness> = new EventEmitter();

  icons: string[] = ['twitter', 'instagram', 'facebook', 'snapchat', 'discord', 'youtube'];
  constructor(private firestore: AngularFirestore, private angularFireStorage: AngularFireStorage) {
    this.getBusiness().subscribe(async value => {
      if (value.length != 0) {
        this.business = value[0];
        if (this.business != null) {
          this.getBrandImageUrls(this.business.brandImage).subscribe(url => {
            this.business.brandImageUrl = url;
            this.onValueChange.emit(this.business);

          })
        }
        this.onValueChange.emit(this.business);
      } else {
        await this.addDefaultBusinnes();
      }
    });
  }

  getBusiness(): Observable<IBusiness[]> {
    return this.firestore.collection<IBusiness>(this.PATH).valueChanges({ idField: 'id' })
  }
  async updateBusiness(business: IBusinessAddRequest): Promise<void> {
    return await this.firestore.collection<IBusinessAddRequest>(this.PATH).doc(this.business.id).update(business);
  }

  async addDefaultBusinnes(): Promise<DocumentReference<IBusinessAddRequest>> {
    const busines: IBusinessAddRequest = {
      brandImage: '',
      brandName: 'Özderk',
      whatsapNumber: '+905522425295',
      social: []
    };
    return await this.firestore.collection<IBusinessAddRequest>(this.PATH).add(busines);
  }
  getBrandImageUrls(path: string): Observable<string> {
    return this.angularFireStorage.ref(this.basePath + "/" + path).getDownloadURL()
  }
  async checkImageExist(url: string): Promise<boolean> {
    return await new Promise<boolean>(res => {
      this.getBrandImageUrls(url).subscribe(el => {
        return res(true);
      }, er => {
        return res(false);
      });
    });
  }
  async deleteImageExist(url: string): Promise<boolean> {
    return await new Promise<boolean>(res => {
      this.angularFireStorage.ref(this.basePath + "/" + url).delete()
        .subscribe(el => {
          return res(true);
        }, er => {
          return res(false);
        });
    });

  }
  async uploadFile(file: File) {
    this.isLoading = true;
    const filePath = `${this.basePath}/${file.name}`;    //path at which image will be stored in the firebase storage
    const snap = await this.angularFireStorage.upload(filePath, file);    //upload task   
    this.isLoading = false;
  }
}
