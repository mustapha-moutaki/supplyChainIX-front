export interface Product {
  id: number;
  name: string;
  description: string;
  productionTime?: number;
  cost?: number;
  stock?: number;
  minimumStock?: number;
  unit?: string | number;
  billOfMaterials?: {
    idBOM: number;
    materialId: number;
    materialName: string;
    materialUnit: string;
    quantity: number;
  }[];
}
