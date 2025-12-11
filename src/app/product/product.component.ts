import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { ProductService } from '../core/services/product.service';
import { AnalyticsService } from '../core/services/analytics.service';
import { Observable } from 'rxjs';
import { RentalModalComponent } from '../shared/components/rental-modal/rental-modal.component';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, AsyncPipe, RentalModalComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  id = input<string>('');
  productService = inject(ProductService);
  analyticsService = inject(AnalyticsService);
  product$!: Observable<Product | undefined>;
  isModalOpen = false;
  currentProduct: Product | null = null;

  ngOnInit(): void {
    this.product$ = this.productService.getById(this.id());

    // Track product view
    this.product$.subscribe(product => {
      if (product) {
        this.analyticsService.trackViewProduct(product.id, product.name, product.price);
      }
    });
  }

  openRentalModal(product: Product) {
    this.analyticsService.trackRentIntent(product.id, product.name, product.price);
    this.currentProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
