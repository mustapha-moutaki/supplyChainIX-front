export interface CreateRawMaterial {
  name: string;
  description: string;
  stock: number;
  stockMin: number;
  unitPrice: number;
  unit: string;
  supplierIds: number[];
}
