
  import { inject, Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../environments/environment.development';
  import { Observable, map } from 'rxjs';
  import { Supplier } from '../core/models/supplier.model';

  @Injectable({ providedIn: 'root' })
  export class SupplierApi {
    private http = inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/suppliers`;

  getAll(name? : string): Observable<Supplier[]> {
    return this.http.get<any>(this.url, {
      params: name ? { name } : {}
    }).pipe(
      map(res => {
        const suppliers = res.content || []; 
        
        return suppliers;
      })
    );
  }

  create(supplier: Supplier): Observable<Supplier> {
  return this.http.post<Supplier>(this.url, supplier);
}



  delete(id:string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  edit(id: string, data: Supplier): Observable<Supplier>{
    return this.http.put<Supplier>(`${this.url}/${id}`, data); // edit the supplier
  }

  }