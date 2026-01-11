import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})


export class SidebarComponent implements OnInit {
  // @Input() role?: string; 
 @Input() role?: string | null;
  private authService = inject(AuthService);

  ngOnInit(): void {
    // If the role wasn't passed by the parent via [role]="...", 
    // we get it from our service
    if (!this.role) {
      this.role = this.authService.getRole() || ''; 
    }
    console.log('Sidebar loaded with role:', this.role);
  }
}