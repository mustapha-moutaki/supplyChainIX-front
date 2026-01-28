import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../../core/service/product.service";
import { Product } from "../../../core/models/product.model";

@Component({
    selector: 'app-product-view-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-product-details.component.html',
})
export class ProductViewDetailsComponent implements OnInit {

    private readonly router: Router = inject(Router);
    private readonly productService = inject(ProductService);
    private readonly route = inject(ActivatedRoute); // to get id from URL

    productDetails: Product | null = null;
    id: number | null = null;
    loading = false;

    
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
        if (this.id) {
            this.loadProductDetails(this.id);
        }
    }

    loadProductDetails(productId: number): void {
        this.loading = true;
        this.productService.getProduct(productId).subscribe({
            next: (res: any) => {
                this.productDetails = res.data; 
                this.loading = false;
                console.log(this.productDetails);
            },
            error: (err) => {
                console.error('Error:', err);
                this.loading = false;
            }
        });
    }
}
