import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/service/product.service';
import { Product } from '../../core/models/product.model';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  showModal = false;

  // Form model for product
  productForm: Product = {
    id: 0,
    name: '',
    description: '',
    productionTime: 0,
    cost: 0,
    stock: 0,
    minimumStock: 0,
    unit: '',
    billOfMaterials: [
      { idBOM: 0, materialId: 0, materialName: '', materialUnit: '', quantity: 1 }
    ]
  };

  // Example materials for the select dropdown
  materials = [
    { id: 1, name: 'Wood' },
    { id: 2, name: 'Metal' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products
  private loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  // Delete a product
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.error = 'Failed to delete product')
    });
  }

  // Open modal to add a new product
  addProduct(): void {
    this.showModal = true;
    this.productForm = {
      id: 0,
      name: '',
      description: '',
      productionTime: 0,
      cost: 0,
      stock: 0,
      minimumStock: 0,
      unit: '',
      billOfMaterials: [
        { idBOM: 0, materialId: 0, materialName: '', materialUnit: '', quantity: 1 }
      ]
    };
  }

  // Open modal to edit existing product
  editProduct(product: Product): void {
    console.log('Edit product clicked:', product);
    // Create a deep copy so changes in modal don't reflect in table until saved
    this.productForm = JSON.parse(JSON.stringify(product));
    // Ensure billOfMaterials is initialized if it's null
    if (!this.productForm.billOfMaterials) {
      this.productForm.billOfMaterials = [];
    }
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Submit product to API (Handles both Add and Update)
  submitProduct(): void {
    console.log('Submitting product:', this.productForm);
    
    // Logic check: If id is 0, create. If id > 0, update.
    const isEditing = this.productForm.id > 0;
    const request$ = isEditing 
      ? this.productService.updateProduct(this.productForm.id, this.productForm) 
      : this.productService.createProduct(this.productForm);

    request$.subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
        // Reset form exactly as you had it before
        this.productForm = {
          id: 0,
          name: '',
          description: '',
          productionTime: 0,
          cost: 0,
          stock: 0,
          minimumStock: 0,
          unit: '',
          billOfMaterials: [
            { idBOM: 0, materialId: 0, materialName: '', materialUnit: '', quantity: 1 }
          ]
        };
      },
      error: () => {
        this.error = isEditing ? 'Failed to update product' : 'Failed to add product';
      }
    });
  }
}