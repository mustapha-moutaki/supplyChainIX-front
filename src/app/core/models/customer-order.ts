export interface ProductOrder {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface CustomerOrder {
    id: number;
    customerId: number;
    productOrders: ProductOrder[];
    status: 'EN_PREPARATION' | 'EN_ROUTE' | 'LIVREE';
    delivery: any | null;
}