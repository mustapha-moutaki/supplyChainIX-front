import { Injectable, inject } from "@angular/core";
import { AuthApi } from "../../api/auth.api";
import { LoginRequest } from "../models/auth.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

 
  private authApi = inject(AuthApi);

  private accessToken: string | null = null;




  // ----------------- LOGIN -----------------
  login(data: LoginRequest): Observable<any> {
    return this.authApi.login(data).pipe(
      tap(res => {
        this.accessToken = res.accessToken; // store in memory

        // save role if needed
        localStorage.setItem('role', res.role);

           // save refresh token in localStorage for testing
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  // logout
  logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => {
        this.accessToken = null;         // clear memory
        
         localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken'); // if you stored it for testing
      })
    );
  }

  // get access token
   getAccessToken(): string | null {
    return this.accessToken;
  }
}
