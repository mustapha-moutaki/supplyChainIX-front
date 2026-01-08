import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Supplier } from '../core/models/app-models';

@Injectable({ providedIn: 'root' })
export class SupplierApi {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/suppliers`;

  // جلب الكل مع Pagination
  getAll(page: number = 0, size: number = 10) {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.url, { params });
  }

  // بحث بالاسم
  search(name: string) {
    return this.http.get<Supplier[]>(`${this.url}/search`, { params: { name } });
  }

  create(data: Partial<Supplier>) {
    return this.http.post<Supplier>(this.url, data);
  }
}