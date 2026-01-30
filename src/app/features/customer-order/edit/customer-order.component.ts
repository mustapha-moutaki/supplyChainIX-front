import { Component, inject, OnInit, signal } from "@angular/core";
import { CustomerOrderService } from "../../../core/service/customer-order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerOrder } from "../../../core/models/customer-order";
import { CommonModule, NgFor } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-customer-order-edit',
  templateUrl: './customer-order.component.html',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
})
export class CustomerOrderEditComponent implements OnInit {

  private customerOrderService = inject(CustomerOrderService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  orderId: number | null = null;
  order = signal<CustomerOrder | null>(null);

  form!: FormGroup;

  ngOnInit(): void {
  
    this.form = this.fb.group({
      id: [''],
      status: [''],
      delivery: [''],
      productOrders: this.fb.array([])
    });

    const idParams = this.route.snapshot.paramMap.get('id');
    if (idParams) {
      this.orderId = Number(idParams);
      this.getOrderId(this.orderId);
    }
  }

  get productOrders(): FormArray {
    return this.form.get('productOrders') as FormArray;
  }

  getOrderId(id: number) {
    this.customerOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order.set(order);

      
        this.form.patchValue({
          id: order.id,
          status: order.status,
          delivery: order.delivery
        });

      
        this.productOrders.clear();
        order.productOrders.forEach(p => {
          this.productOrders.push(
            this.fb.group({
              productId: [p.productId],
              quantity: [p.quantity],
              unitPrice: [p.unitPrice],
              totalPrice: [p.totalPrice]
            })
          );
        });
      },
      error: (err) => console.error(err)
    });
  }



// edit
isSaving = false;

onSubmit() {
  if (this.form.valid) {
    this.isSaving = true;
    
    const orderId = this.form.value.id;
    const orderData = this.form.value;

    this.customerOrderService.editCustomerOrder(orderId, orderData).subscribe({
      next: (response) => {
        this.isSaving = false;
        console.log('Order updated successfully', response);
        this.router.navigate(['/orders']); 
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Update failed', err);
      }
    });
  } else {  
    this.form.markAllAsTouched();
  }
}


  }

