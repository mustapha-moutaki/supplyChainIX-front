export interface Supplier {
  id: number;
  name: string;
  contactInfo?: string;
}

export interface Order {
  id: number;
  orderDate: string;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
}

export interface ProductionOrder {
  id: number;
  productId: number;
  quantity: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}