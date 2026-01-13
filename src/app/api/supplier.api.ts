import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment} from "../../environments/environment.development";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root'})

export class Supplier{
    private http = inject(HttpClient)
    private readonly url = `${environment.apiBaseUrl}/suppliers`;


    getAll(): Observable<Supplier[]>{
        console.log("this.url")
        return this.http.get<any>(this.url).pipe(
            map(res => res.data.content)
        )
    };

    getById(id: number): Observable<Peoduct>{
        return this.http.get(`${this.url}/${id}`);
    }

    create(product:Product):Observable<Product>{
        return this.http.post(this.url, product)
    }

    
}