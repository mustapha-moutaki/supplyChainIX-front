import { inject, Injectable } from "@angular/core";
import { CustomerApi } from "../../api/customer.api";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";
import { PageResponse } from "../models/pageResponse.model";

@Injectable({providedIn: 'root'})
export class CustomerService{
    private readonly customerApi = inject(CustomerApi);


    // get all service method
    getAll(): Observable<PageResponse<Customer>>{

        return this.customerApi.getAll();
    }


    delete(id: string): Observable<void> {
        return this.customerApi.delete(id);
    }
    
}