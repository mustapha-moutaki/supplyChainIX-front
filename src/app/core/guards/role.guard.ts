import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const expectedRole = route.data['role']; // Get role required for this route
  const userRole = authService.getRole();

  //  First check if the user has a valid (non-expired) access token
  if (authService.isAuthenticated()) {
    //  Token is valid, check if user has the required role
    if (userRole === expectedRole) {
      return true;
    }
    // User is authenticated but doesn't have the required role
    router.navigate(['/dashboard']);
    return false;
  }

  // Access token is expired but refresh token exists
  // Try to refresh the token before denying access
  if (authService.hasRefreshToken()) {
    //  Return an Observable that attempts token refresh
    return authService.refreshAccessToken().pipe(
      map(() => {
        //  Token refresh successful - get the updated role
        const refreshedRole = authService.getRole();
        
        //  Check if refreshed user has the required role
        if (refreshedRole === expectedRole) {
          return true; // Allow navigation
        } else {
          //  Still doesn't have required role after refresh
          router.navigate(['/dashboard']);
          return false;
        }
      }),
      catchError(() => {
        //  Token refresh failed - redirect to login
        // Save the attempted URL so we can redirect back after login
        router.navigate(['/login'], { 
          queryParams: { returnUrl: state.url } 
        });
        return of(false); // Deny navigation
      })
    );
  }

  //  No valid tokens at all - redirect to login
  // The returnUrl query param allows redirecting back after successful login
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};

//  Simple auth guard to check if user is logged in (without role check)
// Use this guard for routes that just need authentication, not specific roles
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //  Check if user has valid access token
  if (authService.isAuthenticated()) {
    return true; // User is authenticated, allow access
  }

  //  Check if refresh token exists and try to refresh
  if (authService.hasRefreshToken()) {
    return authService.refreshAccessToken().pipe(
      map(() => true), // Refresh successful, allow access
      catchError(() => {
        //  Refresh failed, redirect to login with return URL
        router.navigate(['/login'], { 
          queryParams: { returnUrl: state.url } 
        });
        return of(false); // Deny access
      })
    );
  }

  //  No tokens at all - redirect to login immediately
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};