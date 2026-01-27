import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../core/service/supplier.service';
import { Supplier } from '../../core/models/supplier.model';
import { CreateSupplierComponent } from '../../shared/modal/supplier-modals/create-modal/create-supplier.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, CreateSupplierComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private destroyRef = inject(DestroyRef); // For clean subscription cleanup

  suppliers = signal<Supplier[]>([]);
  loading = signal<boolean>(false);
  searchTerm = signal('');

  // Modal controls
  isCreateModalOpen = signal(false);
  selectedSupplier = signal<Supplier | null>(null);

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    // Setup Debounced Search
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef) // Automatically unsubscribes
    ).subscribe(value => {
      this.loadSuppliers(value);
    });

    this.loadSuppliers();
  }

  // FIXED: Passing string directly instead of an object
  loadSuppliers(name?: string) {
    this.loading.set(true);
    
    // Based on your error, the service wants: getSuppliers(string | undefined)
    this.supplierService.getSuppliers(name).subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Search failed", err);
        this.loading.set(false);
      }
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.searchSubject.next(value);
  }

  // Triggered by the "Search" button
  onSearchButtonClick() {
    this.loadSuppliers(this.searchTerm());
  }

  // Clear search and reload everything
  resetSearch() {
    this.searchTerm.set('');
    this.loadSuppliers('');
  }

  // --- Modal Logic ---
  openCreateModal() {
    this.selectedSupplier.set(null);
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  openEditModal(supplier: Supplier) {
    this.selectedSupplier.set(supplier);
    this.isCreateModalOpen.set(true);
  }

  // --- CRUD Operations ---
  onSupplierCreated(supplier: Supplier) {
    this.suppliers.update(list => [...list, supplier]);
  }

  deleteSupplier(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.suppliers.update(list => list.filter(s => s.id !== id)),
        error: (err) => console.error("Delete failed", err)
      });
    }
  }

  editSupplier(id: string, supplier: Supplier) {
    this.supplierService.editSupplier(id, supplier).subscribe({
      next: () => {
        this.loadSuppliers(this.searchTerm()); // Keep current search view
        this.closeCreateModal();
      },
      error: (err) => console.error("Update failed", err)
    });
  }
}