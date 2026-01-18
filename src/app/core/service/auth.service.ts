import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { AuthApi } from "../../api/auth.api";
import { LoginRequest } from "../models/auth.model";
import { tap, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

// NEW CHANGE: Define interface for refresh token response
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApi);
  private http = inject(HttpClient); // NEW CHANGE: Inject HttpClient for refresh API call
  private platformId = inject(PLATFORM_ID);
  private accessToken: string | null = null;
  
  // NEW CHANGE: Add your API URL here (adjust to your backend URL)
  private readonly API_URL = `${environment.apiBaseUrl}}`; // TODO: Replace with your actual API URL

  // Helper to check if we are running in the browser - it's important if we use SSR
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

  // NEW CHANGE: Changed from getter to method - this fixes the "cannot invoke" error
  // Old: get getAccessToken() - was a getter property
  // New: getAccessToken() - now a callable method
  getAccessToken(): string | null {
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

  // NEW CHANGE: Method to check if a refresh token exists in localStorage
  // This is used by the interceptor and guard to determine if token refresh is possible
  // Added browser check for SSR compatibility
  hasRefreshToken(): boolean {
    if (!this.isBrowser()) return false; // NEW CHANGE: SSR safety check
    
    const refreshToken = localStorage.getItem('refreshToken');
    return !!refreshToken; // Returns true if refresh token exists, false otherwise
  }

  // NEW CHANGE: Method to check if access token is expired by decoding the JWT
  // JWT tokens contain an 'exp' claim that indicates expiration time
  isTokenExpired(token: string): boolean {
    try {
      // Decode the JWT payload (middle part of token between two dots)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert seconds to milliseconds
      return Date.now() >= expirationTime; // Check if current time is past expiration
    } catch (error) {
      return true; // If we can't decode the token, consider it expired
    }
  }

  // NEW CHANGE: Method to check if user has a valid (non-expired) access token
  // Used by guards to determine if navigation should be allowed without refresh
  isAuthenticated(): boolean {
    const token = this.getAccessToken(); // NEW CHANGE: Now calls method correctly
    return !!token && !this.isTokenExpired(token);
  }

  // NEW CHANGE: Method to refresh the access token using the refresh token
  // This is called by the interceptor when API returns 401/403
  refreshAccessToken(): Observable<RefreshTokenResponse> {
    // NEW CHANGE: Added browser check for SSR compatibility
    if (!this.isBrowser()) {
      return throwError(() => new Error('Cannot refresh token on server'));
    }
    
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // Make sure this endpoint exists in your backend API
    return this.http.post<RefreshTokenResponse>(`${this.API_URL}/auth/refresh`, { 
      refreshToken 
    }).pipe(
      tap(response => {
        // Update in-memory token
        this.accessToken = response.accessToken;
        
        // NEW CHANGE: Store in localStorage (already checked we're in browser)
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('role', response.role);
      }),
      catchError(error => {
        // NEW CHANGE: If refresh fails, logout the user completely
        this.logout().subscribe(); // Execute logout
        return throwError(() => error);
      })
    );
  }
}
