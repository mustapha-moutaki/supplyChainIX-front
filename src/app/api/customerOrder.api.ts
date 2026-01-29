import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { PageResponse } from "../core/models/pageResponse.model";
import { CustomerOrder } from "../core/models/customer-order";
import { CustomerOrderCreate } from "../core/models/customer-order-create";

@Injectable({ providedIn: 'root'})

export class CustomerOrderApi {
    private readonly http = inject(HttpClient);
    private readonly  url = `${environment.apiBaseUrl}/orders`; 



    // getALlOrders
    getAllCustomersOrders(page: number = 0, size: number=10): Observable<PageResponse<CustomerOrder>>{
        return this.http.get<PageResponse<CustomerOrder>>(`${this.url}?page=${page}&size=${size}`);
    }

    // create customerOrder
    cerateCustomerOrder(order: CustomerOrderCreate): Observable<CustomerOrder>{
        return this.http.post<CustomerOrder>(this.url, order);
    }

}