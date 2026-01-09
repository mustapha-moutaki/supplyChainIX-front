import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';

import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { ProductionDashboardComponent } from './production/production-dashboard.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    AdminDashboardComponent,
    ProductionDashboardComponent,
  ],
})
export class DashboardComponent {
  private auth = inject(AuthService);
  role = computed(() => this.auth.getRole());
}
