import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { LoginRequest, LoginResponse } from "../core/models/auth.model";


@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  // Login
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/authenticate`,
      data,
      { withCredentials: true } // important for refresh token cookie
    );
  }

  // Register
  register(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/register`,
      data,
      { withCredentials: true } 
    );
  }

  // Logout
  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`,{},  { withCredentials: true }  );
  }

  
  // Refresh access token
  refresh(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/refresh-token`,
      {},
      { withCredentials: true } // cookie sent automatically
    );
  }
}


