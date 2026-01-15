import { inject, Injectable } from "@angular/core";
import { SupplierApi } from "../../api/supplier.api"; // Check this path!
import { Observable } from "rxjs";
import { Supplier } from "../models/supplier.model";

@Injectable({ providedIn: 'root' })
export class SupplierService {
    private supplierApi = inject(SupplierApi);

    getSuppliers(): Observable<Supplier[]> {
        return this.supplierApi.getAll();
    }

    creatSupplier(supplier: Supplier):Observable<Supplier>{
        return this.supplierApi.create(supplier);
    }

    deleteSupplier(id: string): Observable<void>{
        return this.supplierApi.delete(id);
    }

    // edit supplier service method
    editSupplier(id: string, supplier: Supplier): Observable<Supplier>{
        return this.supplierApi.edit(id, supplier);
    }
}