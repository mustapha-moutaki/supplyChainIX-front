import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { ProductComponent } from '../product/product.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'products',
        component: ProductComponent
      }
    ]
  }
];