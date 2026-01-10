import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient); // itnject HttpdClient it's works like axios but with advanced features
//   private readonly url = `${environment.apiBaseUrl}/products`;
  private readonly url = `https://api.restful-api.dev/objects`; // for testing purpose

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
