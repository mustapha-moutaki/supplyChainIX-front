import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../../core/models/customer.model';
import * as CustomerActions from './state/customer.actions';
import * as CustomerSelectors from './state/customer.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [CommonModule, RouterLink]
})
export class CustomerComponent implements OnInit {

  private store = inject(Store);


  customers$: Observable<Customer[]> = this.store.select(CustomerSelectors.selectCustomers);
  loading$: Observable<boolean> = this.store.select(CustomerSelectors.selectLoading);
  error$: Observable<string | null> = this.store.select(CustomerSelectors.selectError);

  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  editCustomer(customer: Customer) {
    console.log('Edit', customer);
 
  }

  deleteCustomer(id: string) {
    console.log('Delete', id);
    this.store.dispatch(CustomerActions.deleteCustomer({ id }));
  } 
}
