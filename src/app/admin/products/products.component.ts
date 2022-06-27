import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBanner } from 'src/app/models/banner.model';
import { IProduct } from 'src/app/models/product.model';
import { BannerService } from 'src/app/services/banner.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { AddRoductDialogComponent } from '../dialogs/add-roduct-dialog/add-roduct-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /**content: string;
    title: string;
    url: string; */
  fileName: string | null | undefined = null;
  displayedColumns: string[] = ['No', 'content', 'title', 'url', 'actions'];
  get dataSource(): IProduct[] { return this.productService.products; }
  get isLoading(): boolean { return this.productService.isLoading; }
  constructor(public productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  remove(product: IProduct) {
    console.log("product: ", product);

    Swal.fire({
      title: 'Delete',
      text: ' Would you like to delete ' + product.title + '?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showDenyButton: true,
    }).then(({ value }) => {
      console.log("remove: ", value);
      if (value) {
        // TODO: Remove
        this.productService.deleteBanner(product);
      }
    })
  }


  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddRoductDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}