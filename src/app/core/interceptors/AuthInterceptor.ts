
// NEW CHANGE: Import HttpEvent to properly type the interceptor return value
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
// NEW CHANGE: Import RxJS operators for handling async token refresh
import { catchError, switchMap, throwError, BehaviorSubject, filter, take, Observable } from 'rxjs';

// NEW CHANGE: Create a subject to manage token refresh state across multiple simultaneous requests
let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // NEW CHANGE: Fix - call getAccessToken() as a method, not property
  const token = authService.getAccessToken();

  // Skip auth endpoints - they don't need tokens
  if (req.url.includes('/auth')) {
    return next(req);
  }

  // Add token to request if available
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    
    // NEW CHANGE: Add error handling to catch 401/403 responses (expired tokens)
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // NEW CHANGE: Handle 401 Unauthorized or 403 Forbidden errors
        // These typically mean the access token is expired
        if ((error.status === 401 || error.status === 403) && authService.hasRefreshToken()) {
          // NEW CHANGE: Attempt to refresh the token and retry the request
          return handleTokenRefresh(req, next, authService);
        }
        
        // NEW CHANGE: For other errors, just throw them
        return throwError(() => error);
      })
    );
  }

  return next(req);
};


function handleTokenRefresh(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn, 
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  // NEW CHANGE: Check if we're already refreshing the token
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    // NEW CHANGE: Call the refresh token endpoint
    return authService.refreshAccessToken().pipe(
      switchMap((tokens: any) => {
        // NEW CHANGE: Token refresh successful
        isRefreshing = false;
        refreshTokenSubject.next(tokens.accessToken);
        
        // NEW CHANGE: Retry the original request with the new token
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokens.accessToken}`
          },
          withCredentials: true
        });
        return next(clonedRequest);
      }),
      catchError((error) => {
        // NEW CHANGE: Token refresh failed - logout user
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      })
    );
  } else {
    // NEW CHANGE: If already refreshing, wait for the new token
    // This handles the case where multiple API calls fail simultaneously
    return refreshTokenSubject.pipe(
      filter(token => token !== null), // Wait until we have a new token
      take(1), // Take only the first emission
      switchMap(token => {
        // NEW CHANGE: Retry the request with the new token
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        return next(clonedRequest);
      })
    );
  }
}










// end