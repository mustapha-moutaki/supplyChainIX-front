import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { LoginRequest, LoginResponse } from "../core/models/auth.model";
@Injectable({ providedIn: 'root'})
export class AuthApi{
    // Auth API methods would go here
    private http = inject(HttpClient);
    private readonly url = `${environment.apiBaseUrl}/auth/authenticate`;
    login(data:LoginRequest): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(this.url,data);
    }
}

