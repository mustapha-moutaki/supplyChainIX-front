import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RawMaterialService } from '../../core/service/raw-material.service';
import { RawMaterial } from '../../core/models/raw-material.model';

@Component({
  selector: 'app-raw-material-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './raw-material-edit.component.html',
})
export class RawMaterialEditComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(RawMaterialService);

  // Reactive Form Group
  editForm!: FormGroup;
  
  // State Signals
  loading = signal(false);
  error = signal<string | null>(null);
  id: string | null = null;

  ngOnInit(): void {
    // 1. Initialize Form Structure
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMin: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      unit: ['piece', [Validators.required]]
    });

    // 2. Get ID from URL
    this.id = this.route.snapshot.paramMap.get('id');

    // 3. Load Data if ID exists
    if (this.id) {
      this.loadMaterial();
    }
  }

  loadMaterial() {
  this.loading.set(true);

  this.service.getById(this.id!).subscribe({
    next: (data: RawMaterial) => { 
      this.editForm.patchValue(data);
      this.loading.set(false);
    },
    error: () => {
      this.error.set("Failed to load material data.");
      this.loading.set(false);
    }
  });
}

  onSubmit() {
    if (this.editForm.valid && this.id) {
      this.loading.set(true);
      // this.editForm.value matches your JSON structure exactly
      this.service.edit(this.id, this.editForm.value).subscribe({
        next: () => {
          this.router.navigate(['/raw-materials']); // Redirect back
        },
        error: (err) => {
          this.error.set(err?.error?.message || "Update failed");
          this.loading.set(false);
        }
      });
    }
  }

  // Public method for the "Cancel" button in HTML
  goBack() {
    this.router.navigate(['/raw-material']);
  }
}