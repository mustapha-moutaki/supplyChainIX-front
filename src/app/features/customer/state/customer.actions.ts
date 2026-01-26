import { createAction, props } from '@ngrx/store';
import { Customer } from '../../../core/models/customer.model';

// Load Customers
export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: Customer[] }>()
);
export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>()
);

// Edit Customer
export const editCustomer = createAction(
  '[Customer] Edit Customer',
  props<{ customer: Customer }>()
);

// Delete Customer
export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id: string }>()
);

// Delete Customer - Success
export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ id: string }>()
);

// Delete Customer - Failure
export const deleteCustomerFailure = createAction(
  '[Customer] Delete Customer Failure',
  props<{ error: string }>()
);




