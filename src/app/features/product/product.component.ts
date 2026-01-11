import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/service/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./product.component.html',
})

export class ProductComponent implements OnInit{
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }

  // loading products method
  private loadProducts():void{
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products)=>{
        this.products = products;
        this.loading = false;
      },
      error: (err)=>{
        this.error = 'Failed to load products ';
        this.loading = false;
      }
    });
  }


  // delete product method
  deleteProduct(id: number): void{
    if(!confirm('Are you sure you wanna to delete this product?'))
    this.productService.deleteProduct(id).subscribe({
      next:()=> this.loadProducts(),
      error:(err) => {
        this.error = 'Failed to delete product'
      }
    })
  }

  
  // add the produtc method
  addProduct(): void{
   const newProduct: Product ={id: 0, name: 'New Product', description: 'New Product Description', unit: 0, stock: 0};
   this.productService.createProduct(newProduct).subscribe({
    next:()=> this.loadProducts(),
    error:(err) => {
      this.error = 'Failed to add product'
    }
   })
  }


   // Edit product (placeholder)
  editProduct(product: Product): void {
    // For now, just log it
    console.log('Edit product clicked:', product);
    // Later you can open a modal or navigate to edit page
  }
}