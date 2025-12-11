import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product';
import { HttpClient } from '@angular/common/http';

interface ApiProduct {
  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private http = inject(HttpClient);
  private apiUrl = '/assets/data/products.json';

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ApiProduct[]>(this.apiUrl)
      .pipe(
        map((apiProducts) =>
          apiProducts.map((apiProduct) =>
            this.mapApiProductToProduct(apiProduct)
          )
        )
      );
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.http.get<ApiProduct[]>(this.apiUrl).pipe(
      map((apiProducts) => {
        const apiProduct = apiProducts.find(p => p.id.toString() === id);
        if (apiProduct) {
          return this.mapApiProductToProduct(apiProduct);
        }
        return undefined;
      })
    );
  }

  private mapApiProductToProduct(apiProduct: ApiProduct): Product {
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description,
      urlImg: apiProduct.imageUrl,
      reviews: Math.floor(Math.random() * 100) + 20, // Mock reviews
      price: apiProduct.unitPrice,
      previousPrice: null,
      category: apiProduct.category,
      sku: apiProduct.sku,
    };
  }
}
