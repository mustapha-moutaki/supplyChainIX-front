import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common"; // Import this to check the environment
import { AuthApi } from "../../api/auth.api";
import { LoginRequest } from "../models/auth.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApi);
  private platformId = inject(PLATFORM_ID); // Identifies if we are on Server or Browser
  private accessToken: string | null = null;

  // Helper to check if we are running in the browser - it's importand if we use SSR
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getRole(): string | null {
    // Only access localStorage if the platform is a browser
    if (this.isBrowser()) {
      return localStorage.getItem('role');
    }
    return null;
  }

  login(data: LoginRequest): Observable<any> {
    return this.authApi.login(data).pipe(
      tap(res => {
        this.accessToken = res.accessToken;
        
        // Wrap localStorage calls to prevent errors on the server
        if (this.isBrowser()) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('role', res.role);
          localStorage.setItem('refreshToken', res.refreshToken);
        }
      })
    );
  }

  get getAccessToken(): string | null {
    if (this.accessToken) return this.accessToken;
    
    // Check for localStorage only if we are in the browser
    if (this.isBrowser()) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => {
        this.accessToken = null;
        // Safety check before clearing storage
        if (this.isBrowser()) {
          localStorage.clear(); 
        }
      })
    );
  }
}