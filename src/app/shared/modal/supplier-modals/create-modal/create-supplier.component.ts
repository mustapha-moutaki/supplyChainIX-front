import { Component, EventEmitter, Input, Output, inject, signal, OnChanges } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../../core/models/supplier.model';
import { SupplierService } from '../../../../core/service/supplier.service';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyValuePipe],
  templateUrl: './create-supplier.components.html'
})
export class CreateSupplierComponent implements OnChanges {

  private supplierService = inject(SupplierService);

  @Input() isOpen: boolean = false;

  //  ADDED: used when opening modal in edit mode
  @Input() supplierToEdit: Supplier | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Supplier>();

  //  ADDED: emitted when editing an existing supplier
  @Output() updated = new EventEmitter<Supplier>();

  // Form fields
  id = ''; //  ADDED: keep supplier id when editing
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

  //  ADDED: detect when supplierToEdit changes
  ngOnChanges(): void {
    if (this.supplierToEdit) {
      //  Fill the form when editing
      this.id = this.supplierToEdit.id ?? '';
      this.name = this.supplierToEdit.name;
      this.contact = this.supplierToEdit.contact;
      this.email = this.supplierToEdit.email;
      this.phone = this.supplierToEdit.phone;
      this.rating = this.supplierToEdit.rating;
      this.leadTime = this.supplierToEdit.leadTime;
      this.materialIdsString = this.supplierToEdit.materialIds.join(',');
    } else {
      // Reset form when creating a new supplier
      this.resetForm();
    }
  }

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

  // Save supplier (Create OR Edit)
  saveSupplier() {
    this.loading.set(true);
    this.error.set(null);

    const supplier: Supplier = {
      id: this.id, //  Use id only when editing
      name: this.name,
      contact: this.contact,
      email: this.email,
      phone: this.phone,
      rating: this.rating,
      leadTime: this.leadTime,
      materialIds: this.materialIds
    };

    // ADDED: if supplierToEdit exists → EDIT mode
    if (this.supplierToEdit) {
      this.updated.emit(supplier);
      this.loading.set(false);
      this.closeModal();
      return;
    }

    // 🔵 CREATE mode (original logic untouched)
    this.supplierService.creatSupplier(supplier).subscribe({
      next: (res) => {
        this.created.emit(res);
        this.loading.set(false);
        this.closeModal();
      },
      error: (err: any) => {
        this.loading.set(false);

        console.log('Backend Error:', err);

        if (err.status === 400 && err.error?.validationErrors) {
          this.error.set(err.error.validationErrors);
        } else {
          this.error.set({ general: err.error?.message || 'A server error occurred' });
        }
      }
    });
  }

  //  ADDED: helper to reset form fields
  resetForm() {
    this.id = '';
    this.name = '';
    this.contact = '';
    this.email = '';
    this.phone = '';
    this.rating = 0;
    this.leadTime = 0;
    this.materialIdsString = '';
  }

  // Helper to get keys of error object (used in template)
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
