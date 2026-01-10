import { Routes } from '@angular/router';

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
