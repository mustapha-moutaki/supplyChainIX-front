
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authRoutes } from './features/auth/auth.routes';
import { authGuard } from './core/guards/role.guard';
import { SupplierComponent } from './features/supplier/supplier.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { RawMaterialComponent } from './features/raw-material/raw-material.component';

export const routes: Routes = [

  //  Home page
  {
    path: '',
    component: WelcomeComponent
  },

  // Dashboard (protected)
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },

  //  Auth pages (login, register...)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [...authRoutes]
  },

  // Supplier page
  {
    path: 'supplier',
    component: SupplierComponent
  },

  //  Not found
  {
    path: '**',
    redirectTo: ''
  }
];
