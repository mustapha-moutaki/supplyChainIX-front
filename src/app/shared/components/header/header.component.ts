import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Clear local state if needed
        console.log('Logged out successfully');

        // Optionally redirect to login page
        // e.g., using Angular Router
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
