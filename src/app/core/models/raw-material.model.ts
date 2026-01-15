export interface RawMaterial {
  id: string;
  name: string;
  stock: number;
  availableStock: number;
  stockMin: number;
  unitPrice: number;
  unit: string;
  isCriticalStock: boolean;
  description?: string;
  supplierIds?: number[];
}
