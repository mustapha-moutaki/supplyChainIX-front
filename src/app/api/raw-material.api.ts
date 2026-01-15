import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { RawMaterial } from "../core/models/raw-material.model";
import { PageResponse } from "../core/models/pageResponse.model"
@Injectable({ providedIn: 'root'})

export class RawMaterialAPi{

    private http = inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/raw-materials`;


    // getAll():Observable<RawMaterial []>{
    //     return this.http.get<RawMaterial []>(this.url);
    // }

      getAll(page: number, size: number): Observable<PageResponse<RawMaterial>> {
    return this.http.get<PageResponse<RawMaterial>>(this.url, {
      params: {
        page,
        size
      }
    });
  }

  // delete raw material
  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}