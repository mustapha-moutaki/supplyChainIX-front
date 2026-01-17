import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../core/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient); // itnject HttpdClient it's works like axios but with advanced features
  private readonly url = `${environment.apiBaseUrl}/products`;
  // private readonly url = `https://api.restful-api.dev/objects`; // for testing purpose

  getAll(): Observable<Product[]> {
    console.log(this.url)
    return this.http.get<any>(this.url).pipe(
    map(res => res.data.content)
  );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.url}/${id}`, product);
}

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
