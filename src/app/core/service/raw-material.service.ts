import { inject, Injectable } from "@angular/core";
import { RawMaterialAPi } from "../../api/raw-material.api";
import { Observable } from "rxjs";
import { CreateRawMaterial } from "../models/create-raw-material.model";
import { PageResponse } from "../../core/models/pageResponse.model"
import { RawMaterial } from "../models/raw-material.model";


@Injectable({ providedIn: 'root'})

export class RawMaterialService{
    private readonly rawMaterialApi = inject(RawMaterialAPi);


   getAll(page: number, size: number): Observable<PageResponse<RawMaterial>> {
    return this.rawMaterialApi.getAll(page, size);
  }



  // delete raw-material
  delete(id: string):Observable<void>{
    return this.rawMaterialApi.delete(id);
  }


  // create a row material
  creatRawMaterial(rawMaterial: CreateRawMaterial):Observable<RawMaterial>{
    return this.rawMaterialApi.create(rawMaterial);
  }

}