export interface Product {
  id: 0 ;
  name: string;
  description: string;
  productionTime?: number;
  cost?: number;
  stock?: number;
  minimumStock?: number;
  unit?: string | number;
 billOfMaterials: {        // removed ? to make it required
    idBOM: number;
    materialId: number;
    materialName: string;
    materialUnit: string;
    quantity: number;
  }[];
}
