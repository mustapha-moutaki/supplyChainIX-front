import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { CustomerOrderService } from '../../core/service/customer-order.service';
import { CustomerOrder } from '../../core/models/customer-order';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router"; 

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit {
  private readonly customerOrderService = inject(CustomerOrderService);

  // Data
  orders = signal<CustomerOrder[]>([]);
  loading = signal(false);

  // Pagination Signals
  pageNumber = signal(0);
  pageSize = signal(10);
  totalElements = signal(0);
  totalPages = signal(0);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    

    this.customerOrderService.getAllCustomerOrders(this.pageNumber(), this.pageSize())
      .subscribe({
        next: (response) => {
          this.orders.set(response.content);
          console.log(this.orders());
          this.totalElements.set(response.totalElements);
          this.totalPages.set(response.totalPages);
          
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  // Methods to change pages
  nextPage(): void {
    if (this.pageNumber() + 1 < this.totalPages()) {
      this.pageNumber.update(p => p + 1);
      this.loadOrders(); 
    }
  }

  previousPage(): void {
    if (this.pageNumber() > 0) {
      this.pageNumber.update(p => p - 1);
      this.loadOrders(); 
    }
  }

  getTotalPrice(order: any): number {
    return order.productOrders.reduce((acc: number, item: any) => acc + item.totalPrice, 0);
  }
}