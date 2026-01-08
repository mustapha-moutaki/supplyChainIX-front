import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // import RouterOutlet and RouterLink for routing
  template: `
    <nav>
      <!-- use routerLink for navigation -->
      <button routerLink="/procurement/materials">Raw Material </button>
      <button routerLink="/production/orders"> Prodcution orders</button>
    </nav>

    <hr>

    <!-- here is the routed views -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}