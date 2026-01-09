import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // import RouterOutlet and RouterLink for routing
  template: `
   <nav class="flex space-x-4 bg-white p-4 shadow rounded-md">

  <button 
    routerLink="/procurement/materials"
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
  >
    Raw Material
  </button>

  <button 
    routerLink="/production/orders"
    class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
  >
    Production Orders
  </button>
</nav>


    <hr>

    <!-- here is the routed views -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}