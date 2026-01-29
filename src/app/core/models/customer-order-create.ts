export interface ProductOrderCreate {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerOrderCreate {
  customerId: number;
  productOrders: ProductOrderCreate[];
}
