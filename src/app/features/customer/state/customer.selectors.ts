import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectCustomers = createSelector(
  selectCustomerState,
  state => state.customers
);

export const selectLoading = createSelector(
  selectCustomerState,
  state => state.loading
);

export const selectError = createSelector(
  selectCustomerState,
  state => state.error
);
