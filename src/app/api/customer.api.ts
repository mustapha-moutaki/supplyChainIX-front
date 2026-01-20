import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Customer } from "../core/models/customer.model";
import { PageResponse } from "../core/models/pageResponse.model";

@Injectable({ providedIn: 'root'})

export class CustomerApi{
    private readonly http =  inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/customers`;


    // get all Customers
    getAll(): Observable<PageResponse<Customer>>{
        return this.http.get<PageResponse<Customer>>(this.url);
    }
}