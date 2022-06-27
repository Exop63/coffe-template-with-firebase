import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IProduct, IProductAddRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  readonly PATH: string = "products";
  private basePath = '/products';

  products: IProduct[] = [];
  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore, private angularFireStorage: AngularFireStorage) {

    this.isLoading = true;
    this.getProducts().subscribe(res => {
      this.isLoading = false;

      this.products = res
      this.products.forEach((el, index) => {
        this.getProductUrls(el.url).subscribe(resp => {
          this.products[index].imgUrl = resp;
        })
      })
    });

  }
  getProducts(): Observable<IProduct[]> {
    return this.firestore.collection<IProduct>(this.PATH).valueChanges({ idField: 'id' })
  }

  getProductUrls(path: string): Observable<string> {
    return this.angularFireStorage.ref(this.basePath + "/" + path).getDownloadURL()
  }

  async postProduct(product: IProductAddRequest): Promise<DocumentReference<IProductAddRequest>> {
    return await this.firestore.collection<IProductAddRequest>(this.PATH).add(product);
  }

  async deleteBanner(product: IProduct) {
    await new Promise((res, rej) => { this.angularFireStorage.ref(this.basePath + "/" + product.url).delete().subscribe((el) => res(null)); })
    await this.firestore.collection<IProduct>(this.PATH).doc(product.id).delete();

  }



  async checkImageExist(url: string): Promise<boolean> {
    return await new Promise<boolean>(res => {
      this.getProductUrls(url).subscribe(el => {
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
