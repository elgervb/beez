
export interface Queen {
  name: string;
  color?: string;
  wingsCut?: boolean;
  year: number;
  mother?: Queen;
  bought: boolean;
  boughtFrom?: string;
  active: boolean;
}