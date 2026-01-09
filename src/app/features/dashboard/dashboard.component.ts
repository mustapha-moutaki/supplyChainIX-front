import { Component, computed, inject } from '@angular/core';
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
    SidebarComponent,   
    HeaderComponent,       
    AdminDashboardComponent,
    ProductionDashboardComponent,
  ],
})
export class DashboardComponent {
  //the deffault role is admin for demo purposes
  role : string = 'ADMIN' ;
}
