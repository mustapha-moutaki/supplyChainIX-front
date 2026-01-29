import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms"; // For ngModel
import { CustomerOrderService } from "../../../core/service/customer-order.service";
import { CustomerOrderCreate, ProductOrderCreate } from "../../../core/models/customer-order-create";

@Component({
  selector: 'app-customer-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-order-create.component.html',
})
export class CustomerOrderCreateComponent {
  private readonly customerOrderService = inject(CustomerOrderService);

  // Initialize the form model
  customerOrder: CustomerOrderCreate = {
    customerId: 0,
    productOrders: [
      {
        productId: 0,
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0
      },
    ],
  };

  // Add a product row
  addProduct() {
    this.customerOrder.productOrders.push({
      productId: 0,
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    });
  }

  // Remove a product row
  removeProduct(index: number) {
    this.customerOrder.productOrders.splice(index, 1);
  }

  // Submit the order using create model
  submitCustomerOrder(): void {
    this.customerOrderService.createCustomerOrder(this.customerOrder).subscribe({
      next: (res) => {
        console.log('Customer order created successfully', res);
      },
      error: (err) => {
        console.error('Error creating customer order', err);
      }
    });
  }
}

