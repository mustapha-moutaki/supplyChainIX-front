import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductionOrderApi {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/production-orders`;

 
  startProduction(id: number) {
    return this.http.put(`${this.url}/production/${id}`, {});
  }

  // filter by status
  getByStatus(status: string) {
    return this.http.get<any[]>(`${this.url}/status/${status}`);
  }

  cancel(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}