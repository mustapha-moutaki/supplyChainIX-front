import { Routes } from '@angular/router';

export const PROCUREMENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'materials', 
        loadComponent: () => import('./material-list.component').then(m => m.MaterialListComponent) 
      },
      // other procurement routes can be added here
      // { path: 'suppliers', loadComponent: ... }
    ]
  }
];