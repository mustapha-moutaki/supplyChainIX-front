import { Component, inject } from '@angular/core';
import { CustomerService } from '../../core/service/customer.service';
import { Customer } from '../../core/models/customer.model';
@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  private readonly customerService = inject(CustomerService);

  customers: Customer [] = [];
  loading = false;
  error = '';

  private loadCustomers(): void{
    this.customerService.getAll().subscribe({
      next: (response) => {
        this.customers = response.content; 
      },
      error: (err)=>{
        console.log("Failed to laod the customers ", err)
      }
    })
  }
}
