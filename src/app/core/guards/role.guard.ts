import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const expectedRole = route.data['role']; // Get role required for this route
  const userRole = authService.getRole();

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/dashboard']); // Redirect if not allowed
  return false;
};