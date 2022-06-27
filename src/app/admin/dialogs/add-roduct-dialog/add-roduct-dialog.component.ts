import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-roduct-dialog',
  templateUrl: './add-roduct-dialog.component.html',
  styleUrls: ['./add-roduct-dialog.component.css']
})
export class AddRoductDialogComponent {
  form!: FormGroup;
  get Url(): FormControl { return this.form.get('url') as FormControl };

  file!: File | null;
  imageSrc!: string | ArrayBuffer | null;
  get isLoading(): boolean { return this.productService.isLoading; }

  constructor(
    public dialogRef: MatDialogRef<AddRoductDialogComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      content: [null, Validators.required],
      title: [null, Validators.required],
      url: [null, Validators.required]
    });
  }


  async upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file) {
        this.Url.setValue(this.file.name);

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(this.file);

        const isHave = await this.productService.checkImageExist(this.file?.name);
        if (isHave) {
          this.removeImage();
          Swal.fire({
            title: 'Error',
            text: 'This image already has been add. Please select an other image',
            icon: 'error'
          });
        }
      }
    }

  }

  removeImage() {
    this.file = null;
    this.Url.setValue(null);
  }


  async save() {
    if (this.file && this.form.valid) {
      await this.productService.uploadFile(this.file);
      await this.productService.postProduct(this.form.value);
      Swal.fire({
        title: 'successful',
        text: 'Product has successfully added.',
        icon: 'success'
      }).then(() => {
        this.dialogRef.close();
      });
    } else {
      this.form.markAllAsTouched();
      if (this.file == null) {
        Swal.fire({
          title: 'Error',
          text: 'Please select an image',
          icon: 'error'
        });
      }
    }
  }


}
