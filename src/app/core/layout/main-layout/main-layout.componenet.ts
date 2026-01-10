import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: '../../../shared/components/sidebar/sidebar.component.html',
  standalone: true
})
export class SidebarComponent {
  @Input() role!: string;
}
