import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

// Standalone Components
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { ProductionDashboardComponent } from '../production/production-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    AdminDashboardComponent,
    ProductionDashboardComponent,
  ],
})
export class DashboardComponent {
  role: string = 'ADMIN';

  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Everything cleared in service: access token, role
        console.log('Logged out successfully');

        // Optional: redirect to login page
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Logout failed', err)
    });
  }
}
