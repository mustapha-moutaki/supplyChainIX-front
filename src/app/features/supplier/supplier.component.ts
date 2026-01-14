import { Component, OnInit, signal, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../core/service/supplier.service';
import { Supplier } from '../../core/models/supplier.model';
import { CreateSupplierComponent } from '../../shared/modal/supplier-modals/create-modal/create-supplier.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, CreateSupplierComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  private supplierService = inject(SupplierService);

  suppliers = signal<Supplier[]>([]);
  loading = signal<boolean>(false);

  // THIS controls the modal
  isCreateModalOpen = signal(false);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading.set(true);
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  //  open modal
  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  //  close modal
  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  // to update the list
  onSupplierCreated(supplier: Supplier) {

   this.suppliers.update(list => [...list, supplier]);
}
}
