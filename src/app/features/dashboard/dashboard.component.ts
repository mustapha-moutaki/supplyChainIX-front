import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ]
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  private authService = inject(AuthService);

  ngOnInit() {
    const storedRole = this.authService.getRole();
    if (storedRole) {
      this.role = storedRole;
    }
  }
}