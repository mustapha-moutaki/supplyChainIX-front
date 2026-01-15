import { inject, Injectable } from "@angular/core";
import { RawMaterialAPi } from "../../api/raw-material.api";
import { Observable } from "rxjs";
import { RawMaterial } from "../models/raw-material.model";
import { PageResponse } from "../../core/models/pageResponse.model"
@Injectable({ providedIn: 'root'})

export class RawMaterialService{
    private readonly rawMaterialApi = inject(RawMaterialAPi);


   getAll(page: number, size: number): Observable<PageResponse<RawMaterial>> {
    return this.rawMaterialApi.getAll(page, size);
  }
}