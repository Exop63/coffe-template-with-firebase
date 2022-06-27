import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable, of, tap } from 'rxjs';
import { IBanner, IBannerAddRequest } from '../models/banner.model';
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  readonly PATH: string = "banners";
  private basePath = '/banners';
  file!: File | null;
  images: IBanner[] = [];
  isLoading: boolean = true;
  constructor(private firestore: AngularFirestore, private angularFireStorage: AngularFireStorage) {
    this.getBunnersWidthUrls();
  }

  getBanners(): Observable<IBanner[]> {
    return this.firestore.collection<IBanner>(this.PATH).valueChanges({ idField: 'id' })
  }
  getBannerUrls(path: string): Observable<string> {
    return this.angularFireStorage.ref(this.basePath + "/" + path).getDownloadURL()
  }
  getImgUrl(url: string): Observable<string> {
    const find = this.images.find(el => el.url);
    if (find && find.imgUrl) {
      return of(find.imgUrl);
    }

    return this.getBannerUrls(url).pipe(
      tap(banner => {
        if (find)
          find.imgUrl = banner;
      })
    );

  }
  getBunnersWidthUrls() {

    this.getBanners().subscribe(image => {
      this.isLoading = false;
      this.images = image;
      image.forEach((el, index) => {
        this.getBannerUrls(el.url).subscribe(banner => {
          this.images[index].imgUrl = banner;
        })
      })
    });
  }


  async deleteBanner(banner: IBanner) {
    await new Promise((res, rej) => { this.angularFireStorage.ref(this.basePath + "/" + banner.url).delete().subscribe((el) => res(null)); })
    await this.firestore.collection<IBanner>(this.PATH).doc(banner.id).delete();

  }


  handleFiles(event: any) {
    this.file = event.target.files[0];
  }

  async addBanners(banner: IBannerAddRequest): Promise<DocumentReference<IBannerAddRequest>> {
    return await this.firestore.collection<IBannerAddRequest>(this.PATH).add(banner);
  }
  //method to upload file at firebase storage
  async uploadFile() {
    if (this.file) {
      this.getBannerUrls(this.file.name).subscribe(banner => {
        console.log("getBannerUrls: ", banner)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'This file is exist'
        });
      }, async (err: HttpErrorResponse) => {
        console.log("getBannerUrls error: ", err)
        if (err.message.includes('does not exist')) {

          if (this.file) {
            this.isLoading = true;
            const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
            const snap = await this.angularFireStorage.upload(filePath, this.file);    //upload task
            const banner: IBannerAddRequest = {
              url: this.file.name,
            }
            this.addBanners(banner);
            this.file = null;
            this.isLoading = false;

          }
        }
      });





    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an image'
      });
    }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
  }
}
