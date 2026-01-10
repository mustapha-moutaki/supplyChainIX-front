import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApi } from '../../api/product.api';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productApi = inject(ProductApi);

  getProducts(): Observable<Product[]> {
    return this.productApi.getAll();
  }

  getProduct(id: number): Observable<Product> {
    return this.productApi.getById(id);
  }

  createProduct(product: Product): Observable<Product> {
    return this.productApi.create(product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.productApi.update(id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.productApi.delete(id);
  }
}
