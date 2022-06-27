
import { Component, OnInit, } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/models/product.model';
import { BannerService } from 'src/app/services/banner.service';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],


})
export class HomeComponent implements OnInit {

  get Images() { return this.bannerService.images; }
  get Products(): IProduct[] { return this.productService.products; }
  constructor(private productService: ProductService, private service: OrderDetailsService, config: NgbCarouselConfig, private bannerService: BannerService) {
    productService.getProducts().subscribe(console.log)
    // customize default values of carousels used by this component tree
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  foodData: any;

  ngOnInit(): void {
    this.foodData = this.service.foodDetails;

  }

}
