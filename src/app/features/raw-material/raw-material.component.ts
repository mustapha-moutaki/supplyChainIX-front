import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';

import { RawMaterialService } from '../../core/service/raw-material.service';
import { RawMaterial } from '../../core/models/raw-material.model';
import { CreateRawMaterial } from '../../core/models/create-raw-material.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './raw-material.component.html',
})
export class RawMaterialComponent {

 
  // Dependencies
 
  private readonly rawMaterialService = inject(RawMaterialService);
  private readonly router = inject(Router);

  onEdit(id: string | undefined): void{
    if(id){
      // console.log(id); just to verify id is received
      this.router.navigate(['dashboard/raw-material/edit', id]);
      // this.router.navigate(['/dashboard', id]);
    }
  }
 
  // State (Signals)
 
  readonly rawMaterials = signal<RawMaterial[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  // Pagination
  readonly pageNumber = signal(0);
  readonly pageSize = signal(10);
  readonly totalElements = signal(0);
  readonly totalPages = signal(0);

 

  // edit state

  // Create form state
 
  readonly showCreateForm = signal(false);

  // Form fields
  name = '';
  description = '';
  stock = 0;
  stockMin = 0;
  unitPrice = 0;
  unit: 'piece' | 'kg' | 'liter' = 'piece';
  supplierIds: number[] = [];

  constructor() {
    this.loadRawMaterials();
  }

 
  // Load materials
 
  loadRawMaterials(): void {
    this.loading.set(true);
    this.error.set(null);

    this.rawMaterialService
      .getAll(this.pageNumber(), this.pageSize())
      .subscribe({
        next: (res) => {
          this.rawMaterials.set(res.content);
          this.totalElements.set(res.totalElements);
          this.totalPages.set(res.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load raw materials');
          this.loading.set(false);
        },
      });
  }

 
  // Pagination
 
  nextPage(): void {
    if (this.pageNumber() + 1 < this.totalPages()) {
      this.pageNumber.update(p => p + 1);
      this.loadRawMaterials();
    }
  }

  previousPage(): void {
    if (this.pageNumber() > 0) {
      this.pageNumber.update(p => p - 1);
      this.loadRawMaterials();
    }
  }

 
  // Toggle create form
 
 toggleCreateForm(): void {
  console.log("Before toggle:", this.showCreateForm());
  this.showCreateForm.update(v => !v);
  console.log("After toggle:", this.showCreateForm());
  this.error.set(null);
  this.success.set(false);
}

 
  // Create Raw Material
 
  createRawMaterial(): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    const payload: CreateRawMaterial = {
      name: this.name,
      description: this.description,
      stock: this.stock,
      stockMin: this.stockMin,
      unitPrice: this.unitPrice,
      unit: this.unit,
      supplierIds: this.supplierIds,
    };

    this.rawMaterialService.creatRawMaterial(payload).subscribe({
      next: (created) => {
        // add directly to list (UX )
        this.rawMaterials.update(list => [created, ...list]);

        this.loading.set(false);
        this.success.set(true);
        this.resetForm();
        this.showCreateForm.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Failed to create raw material');
      },
    });
  }

  private resetForm(): void {
    this.name = '';
    this.description = '';
    this.stock = 0;
    this.stockMin = 0;
    this.unitPrice = 0;
    this.unit = 'piece';
    this.supplierIds = [];
  }

  // Delete
  delete(id: string | undefined): void {
    if (!id) return;

    this.loading.set(true);

    this.rawMaterialService.delete(id).subscribe({
      next: () => {
        this.rawMaterials.update(list =>
          list.filter(m => m.id !== id)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Delete failed');
      },
    });
  }
}
