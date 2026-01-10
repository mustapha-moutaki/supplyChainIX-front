import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [

  // dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES),
  },

  
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/products.routes')
        .then(r => r.PRODUCTS_ROUTES),
  },



   {
    path: '',
    component: AuthLayoutComponent,
    children: [
      ...authRoutes
    ]
  },


  // redirect root
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // 404
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
