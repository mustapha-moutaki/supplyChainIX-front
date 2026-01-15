import { Component, inject, signal, effect, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMaterialService } from '../../core/service/raw-material.service';
import { RawMaterial } from '../../core/models/raw-material.model';

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raw-material.component.html',
})
export class RawMaterialComponent {

  //  Dependencies
  private readonly rawMaterialService = inject(RawMaterialService);

  //  State (Signals)
  readonly rawMaterials = signal<RawMaterial[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  //  Pagination state (ready for later UI)
  readonly pageNumber = signal(0);
  readonly pageSize = signal(10);
  readonly totalElements = signal(0);
  readonly totalPages = signal(0);

  constructor() {
    this.loadRawMaterials();
  }

  //  New Method (Best Practice)
  loadRawMaterials(): void {
    this.loading.set(true);
    this.error.set(null);

    this.rawMaterialService.getAll(this.pageNumber(), this.pageSize()).subscribe({
      next: (res) => {
        this.rawMaterials.set(res.content);
        this.totalElements.set(res.totalElements);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load raw materials', err);
        this.error.set('Failed to load raw materials');
        this.loading.set(false);
      }
    });
  }

  //  Pagination helpers (future ready)
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


  // delete raw-material
  delete(id: string | undefined): void {
  if (!id) return;

  this.loading.set(true); 

  this.rawMaterialService.delete(id).subscribe({
    next: () => {
      this.rawMaterials.update(list => list.filter(s => s.id !== id));
      this.loading.set(false);
    },
    error: (err: any) => {
      this.loading.set(false);

      if (err.status === 400 && err.error?.validationErrors) {
        this.error.set(err.error.message);
      }
      // any other error like 500
      else if (err.error?.message) {
        this.error.set(err.error.message);
      }
      console.log('Delete error:', err);
    }
  });
}

}
