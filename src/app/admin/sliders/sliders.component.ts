import { Component, OnInit } from '@angular/core';
import { IBanner } from 'src/app/models/banner.model';
import { BannerService } from 'src/app/services/banner.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {
  fileName: string | null | undefined = null;
  displayedColumns: string[] = ['No', 'img', 'url', 'actions'];
  get dataSource(): IBanner[] { return this.bannerService.images; }
  get isLoading(): boolean { return this.bannerService.isLoading; }
  constructor(public bannerService: BannerService) { }

  ngOnInit(): void {
  }
  remove(banner: IBanner) {
    Swal.fire({
      title: 'Delete',
      text: ' Would you like to delete ' + banner.url + '?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showDenyButton: true,
    }).then(({ value }) => {
      console.log("remove: ", value);
      if (value) {
        // TODO: Remove
        this.bannerService.deleteBanner(banner);
      }
    })
  }

  async upload(event: any, uploader: HTMLInputElement) {
    console.log(event.target.files[0]);
    this.bannerService.file = event.target.files[0];
    this.fileName = event.target.files[0]?.name;
    await this.bannerService.uploadFile()
    uploader.value = "";
    this.fileName = null;
  }

}
