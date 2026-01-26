import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Customer } from "../core/models/customer.model";
import { PageResponse } from "../core/models/pageResponse.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root'})

export class CustomerApi{
    private readonly http =  inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/customers`;


    getAll(): Observable<PageResponse<Customer>> {
  return this.http.get<any>(this.url).pipe(
    map(res => res.data)
  );
}

delete(id: string): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);  
}



}