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

  // Form model for new product
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
    if (!confirm('Are you sure you want to delete this product?')) return;
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

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Submit product to API
  submitProduct(): void {
  console.log('Submitting product:', this.productForm);
  this.productService.createProduct(this.productForm).subscribe({
    next: () => {
      this.loadProducts();
      this.closeModal();
      // Reset form with proper BOM structure
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
      this.error = 'Failed to add product';
    }
  });
}

  // Edit product (optional)
  editProduct(product: Product): void {
    console.log('Edit product clicked:', product);
    // you can pre-fill the modal with productForm = { ...product }
  }
}
