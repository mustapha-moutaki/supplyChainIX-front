import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  standalone: true,
})
export class NotFoundComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Optional: auto-redirect after 5 seconds
    // setTimeout(() => this.router.navigate(['/']), 5000);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
