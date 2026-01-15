export interface RawMaterial{
  id: string;
  name: string;
  stock: number;
  availableStock: number;
  stockMin: number;
  unit: string;
  isCriticalStock: boolean;
}