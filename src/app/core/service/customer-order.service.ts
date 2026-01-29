import { Injectable, inject } from "@angular/core";
import { CustomerOrderApi } from "../../api/customerOrder.api";
import { Observable } from "rxjs";
import { PageResponse } from "../models/pageResponse.model";
import { CustomerOrder } from "../models/customer-order";
import { CustomerOrderCreate } from "../models/customer-order-create";
@Injectable({ providedIn: 'root'})
export class CustomerOrderService{
    private readonly customerOrderApi = inject(CustomerOrderApi);

    // getAllCustomerOrders
    getAllCustomerOrders(page: number=0, size: number=10): Observable<PageResponse<CustomerOrder>>{
        return this.customerOrderApi.getAllCustomersOrders(page, size);
    }

    // createCustomerOrder
    createCustomerOrder(order: CustomerOrderCreate): Observable<CustomerOrder>{
        return this.customerOrderApi.cerateCustomerOrder(order);
    }

    // deleteCustomerOrder
    deleteCustomerOrder(id: number): Observable<void>{
        return this.customerOrderApi.deleteCustomerOrder(id)
    }
}