import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../../core/models/customer.model';
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CustomerActions.editCustomer, (state, { customer }) => ({
    ...state,
    customers: state.customers.map(c => c.id === customer.id ? customer : c)
  })),
  on(CustomerActions.deleteCustomer, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(c => c.id !== id)
  }))
);
