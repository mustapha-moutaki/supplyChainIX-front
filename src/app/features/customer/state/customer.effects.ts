import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../../core/service/customer.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() =>
        this.customerService.getAll().pipe(
          map(res => CustomerActions.loadCustomersSuccess({ customers: res.content })),
          catchError(() => of(CustomerActions.loadCustomersFailure({ error: 'Failed to load customers' })))
        )
      )
    )
  );
}
