export interface RawMaterial{
    id?: number; // ? indicates that the field is optional
    name: string;
    unit: string;
    quantity: number;
    criticalLevel: number;
    isUsed?: boolean; 
}