import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { ProductComponent } from '../product/product.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { RawMaterialComponent } from '../raw-material/raw-material.component';
import { BillOfMaterialComponent } from '../bill-of-material/bill-of-material.component'
import { CustomerComponent } from '../customer/customer.component';
import { CustomerFormComponent } from '../customer/customer-form.component';
import { RawMaterialEditComponent } from '../raw-material/raw-material-edit.component';
import { ProductViewDetailsComponent } from '../product/discover-product/view-product-details.component';
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
        path: 'products/:id',
        component: ProductViewDetailsComponent
      },
        {
        path: 'suppliers', // This creates the /dashboard/suppliers path
        component:SupplierComponent
      },
      {
        path: 'raw-material',
        component: RawMaterialComponent
      },
      {
        path: 'raw-material/edit/:id',
        component: RawMaterialEditComponent
      },
      {
          path: 'bill-of-materials',
          component: BillOfMaterialComponent
      },
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'customers/new',
        component: CustomerFormComponent
      }


    ]
  }
];
// NB: this is nested routing in angular 