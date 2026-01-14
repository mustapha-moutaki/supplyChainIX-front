import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule , KeyValuePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../../core/models/supplier.model';
import { SupplierService } from '../../../../core/service/supplier.service';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyValuePipe],
  templateUrl: './create-supplier.components.html'
})
export class CreateSupplierComponent {

  private supplierService = inject(SupplierService);

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Supplier>();

  // Form fields
  name = '';
  contact = '';
  email = '';
  phone = '';
  rating = 0;
  leadTime = 0;
  materialIdsString = '';

  // Signals
  loading = signal(false);
  error = signal<{ [key: string]: string } | null>(null);

  // Close modal & reset errors
  closeModal() {
    this.close.emit();
    this.error.set(null);
  }

  // Convert comma-separated IDs to array
  get materialIds(): number[] {
    return this.materialIdsString
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));
  }

  // Save supplier
  saveSupplier() {
    this.loading.set(true);
    this.error.set(null);

    const supplier: Supplier = {
      name: this.name,
      contact: this.contact,
      email: this.email,
      phone: this.phone,
      rating: this.rating,
      leadTime: this.leadTime,
      materialIds: this.materialIds
    };

    this.supplierService.creatSupplier(supplier).subscribe({
      next: (res) => {
        this.created.emit(res);
        this.loading.set(false);
        this.closeModal();
      },
      error: (err: any) => {
        this.loading.set(false);
        
        // Log it to see exactly what comes back in the console
        console.log('Backend Error:', err);

        if (err.status === 400 && err.error?.validationErrors) {
          // This is the map: { phone: "...", email: "..." }
          this.error.set(err.error.validationErrors);
        } else {
          // Fallback for 500 errors or connection issues
          this.error.set({ general: err.error?.message || 'A server error occurred' });
        }
      }
    });
  }

  // Helper to get keys of error object (used in template)
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
