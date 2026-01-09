import { Routes } from '@angular/router';

export const routes: Routes = [
  
    {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES),
      },

    // 1, redirect root to procurement materials view
  {
     path: '',
     redirectTo: 'procurement/materials',
     pathMatch: 'full'
},

  // 2. laod procurement module lazy loading
  {
    path: 'procurement',
    loadChildren: () => import('./features/procurement/procurement.routes').then(r => r.PROCUREMENT_ROUTES)
  },

  // 3. production module lazy loading
  // {
  //   path: 'production',
  //   loadChildren: () => import('./features/production/production.routes').then(r => r.PRODUCTION_ROUTES)
  // },

  // 4. 404 page redirection
  { path: '**', redirectTo: 'procurement/materials' }

];