export interface RawMaterial{
  id: number;
  name: string;
  stock: number;
  availableStock: number;
  stockMin: number;
  unit: string;
  isCriticalStock: boolean;
}