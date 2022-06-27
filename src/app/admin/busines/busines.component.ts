import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { IBusiness, ISocial } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busines',
  templateUrl: './busines.component.html',
  styleUrls: ['./busines.component.css']
})
export class BusinesComponent {

  file: File | undefined;
  imageSrc!: string | ArrayBuffer | null;
  get icons(): string[] { return this.businessService.icons; }
  form!: FormGroup;
  get Social(): FormArray { return this.form.get('social') as FormArray; }
  get BrandImage(): FormControl { return this.form.get('brandImage') as FormControl; }
  get business(): IBusiness { return this.businessService.business; }
  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService
  ) {
    this.initForm();
    this.businessService.onValueChange.subscribe(el => {
      this.updateForm();

    });
  }
  initForm() {
    this.form = this.formBuilder.group({
      brandName: [],
      brandImage: [],
      whatsapNumber: [null, Validators.required],
      social: this.formBuilder.array([])
    });

  }
  updateForm() {
    this.form.reset();
    this.Social.clear();
    this.form.patchValue(this.businessService.business);
    this.business.social.forEach(el => {
      this.addSocial(el);
    })
    this.imageSrc = this.business.brandImageUrl;
  }

  addSocial(value?: ISocial) {
    if (!value) {
      this.Social.push(this.formBuilder.group({
        icon: [null, Validators.required],
        url: [null, Validators.required],
      }));
    } else {
      this.Social.push(this.formBuilder.group({
        icon: [value.icon, Validators.required],
        url: [value.url, Validators.required],
      }));
    }
  }
  removeSocial(index: number) {
    this.Social.removeAt(index);
  }


  async upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file) {
        this.BrandImage.setValue(this.file.name);

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(this.file);


      }
    }
  }
  removeImage() {
    this.file = undefined;
    this.imageSrc = null;
    this.BrandImage.setValue(null);
  }

  async save() {
    if (this.form.valid) {
      if (this.file) {
        const isHave = await this.businessService.checkImageExist(this.file?.name);
        if (isHave) {
          await this.businessService.deleteImageExist(this.file?.name);
        }
        await this.businessService.uploadFile(this.file);
      }
      await this.businessService.updateBusiness(this.form.value);
      Swal.fire({
        title: 'successful',
        text: 'Product has successfully added.',
        icon: 'success'
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
