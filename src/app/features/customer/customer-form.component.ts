import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Customer } from "../../core/models/customer.model";
import * as CustomerActions from "../customer/state/customer.actions";
@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {

  private store = inject(Store);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    this.store.dispatch(
      CustomerActions.createCustomer({ customer: this.form.value as Customer })
    );

    this.form.reset();
  }
}
