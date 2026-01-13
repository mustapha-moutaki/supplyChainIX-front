// import { Component, OnInit, signal, inject } from '@angular/core';
// import { CommonModule } from '@angular/common'; // Important for *ngFor and *ngIf
// import { SupplierService } from '../../core/service/supplier.service'; // Adjust path
// import { Supplier } from '../../core/models/supplier.model'; // Adjust path

// @Component({
//   selector: 'app-supplier',
//   standalone: true,
//   imports: [CommonModule], 
//   templateUrl: './supplier.component.html',
//   styleUrl: './supplier.component.css'
// })
// export class SupplierComponent implements OnInit {
//   // 2. Inject your service
//   private supplierService = inject(SupplierService);

//   // 3. Define the signal that the HTML is looking for
//   suppliers = signal<Supplier[]>([]);
//   loading = false;

//   ngOnInit(): void {
//     this.loadSuppliers();
//   }

//   loadSuppliers() {
//     this.loading = true;
//     this.supplierService.getSuppliers().subscribe({
//       next: (data) => {
//         // Since your service already maps to 'res.data.content', 
//         // 'data' here is the array of suppliers.
//         this.suppliers.set(data);
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching suppliers:', err);
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SupplierService } from '../../core/service/supplier.service'; 
import { Supplier } from '../../core/models/supplier.model'; 

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  private supplierService = inject(SupplierService);

  // Use signal for the list
  suppliers = signal<Supplier[]>([]);
  loading = signal<boolean>(false); // Changed to signal for consistency

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading.set(true);
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        console.log('Component received data:', data); 
        this.suppliers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error in Component:', err);
        this.loading.set(false);
      }
    });
  }
}