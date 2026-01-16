import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { ProductComponent } from '../product/product.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { RawMaterialComponent } from '../raw-material/raw-material.component';

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
      },
        {
        path: 'suppliers', // This creates the /dashboard/suppliers path
        component:SupplierComponent
      },
      {
        path: 'raw-material',
        component: RawMaterialComponent
      }

    ]
  }
];