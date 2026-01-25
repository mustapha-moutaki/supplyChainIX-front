import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { customerReducer } from './customer.reducer';
import { CustomerEffects } from './customer.effects';
import { CustomerComponent } from '../customer.component';

@NgModule({
  imports: [
    CustomerComponent, // standalone component
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects])
  ]
})
export class customerState {}
