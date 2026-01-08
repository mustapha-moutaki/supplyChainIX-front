import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs';
import { RawMaterial } from '../core/models/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialApi {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/raw-materials`;

  // GET /api/raw-materials
  getAll(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(this.url);
  }
 
  // GET /api/raw-materials/{id}
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // POST /api/raw-materials
  create(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  // PUT /api/raw-materials/{id}
  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

  // DELETE /api/raw-materials/{id}
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  // GET /api/raw-materials/critical-stock
  getCriticalStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/critical-stock`);
  }

  // GET /api/raw-materials/search?name=...
  search(name: string): Observable<any[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<any[]>(`${this.url}/search`, { params });
  }
}