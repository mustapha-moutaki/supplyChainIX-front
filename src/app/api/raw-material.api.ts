import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { CreateRawMaterial } from "../core/models/create-raw-material.model";
import { PageResponse } from "../core/models/pageResponse.model"

import { RawMaterial } from "../core/models/raw-material.model";
@Injectable({ providedIn: 'root'})

export class RawMaterialAPi{

    private http = inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/raw-materials`;



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

  // create a rawMaterial
  create(rawMaterial: CreateRawMaterial): Observable<RawMaterial>{
    return this.http.post<RawMaterial>(this.url, rawMaterial);
  }


}