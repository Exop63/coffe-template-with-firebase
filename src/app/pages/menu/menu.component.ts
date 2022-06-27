import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  get Products(): IProduct[] { return this.productService.products; }
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
  }

}
