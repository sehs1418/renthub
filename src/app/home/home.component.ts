import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { ProductService } from '../core/services/product.service';
import { GeolocationService, CityInfo } from '../core/services/geolocation.service';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent, HomeProductComponent, AsyncPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  geolocationService = inject(GeolocationService);
  cdr = inject(ChangeDetectorRef);

  products$: Observable<Product[]> = this.productService.getAll();
  productOffers$: Observable<Product[]>;
  city$: Observable<CityInfo> = this.geolocationService.city$;

  private offersLoaded = false;
  private flowbiteInitialized = false;

  constructor() {
    this.productOffers$ = this.productService.getOffers().pipe(
      tap((offers) => {
        if (offers && offers.length > 0) {
          this.offersLoaded = true;
          setTimeout(() => this.initializeFlowbite(), 0);
        }
      })
    );
  }

  ngOnInit(): void { }

  private initializeFlowbite(): void {
    if (!this.flowbiteInitialized) {
      console.log('Initializing Flowbite...');
      initFlowbite();
      this.flowbiteInitialized = true;
      this.cdr.detectChanges();
    }
  }
}
