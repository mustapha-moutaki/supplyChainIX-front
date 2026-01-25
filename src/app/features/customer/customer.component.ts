import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../core/service/customer.service';
import { Customer } from '../../core/models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
  imports: [CommonModule]
})
export class CustomerComponent implements OnInit {

  private readonly customerService = inject(CustomerService);

  customers: Customer[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getAll().subscribe({
      next: (res) => {
           console.log('PageResponse from API:', res); 
        this.customers = res.content;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load customers';
        this.loading = false;
      }
    });
  }

  editCustomer(customer: Customer) {
    console.log('Edit', customer);
    // later: open modal or navigate to edit page
  }

  deleteCustomer(id: string) {
    this.customerService.delete(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to delete customer';
      }
    });
  }
}
