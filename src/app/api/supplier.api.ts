import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Supplier } from '../core/models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/suppliers`;

  getAll(): Observable<Supplier[]> {
    return this.http.get<{ data: { content: Supplier[] } }>(this.url).pipe(
      map(res => res.data.content)
    );
  }

  getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.url}/${id}`);
  }

  create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, supplier);
  }
}
