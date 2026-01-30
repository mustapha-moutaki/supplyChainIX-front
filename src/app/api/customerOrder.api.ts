import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { PageResponse } from "../core/models/pageResponse.model";
import { CustomerOrder } from "../core/models/customer-order";
import { CustomerOrderCreate } from "../core/models/customer-order-create";
import { deleteCustomer } from "../features/customer/state/customer.actions";

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


    // delete customerOrder
    deleteCustomerOrder(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    editCustomerOrder(id: number, order: CustomerOrderCreate): Observable<CustomerOrderCreate>{
        return this.http.put<CustomerOrderCreate>(`${this.url}/${id}`, order)
    }

    getOrderById(id: number): Observable<CustomerOrder>{
        return this.http.get<CustomerOrder>(`${this.url}/${id}`);
    }

}