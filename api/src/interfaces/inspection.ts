
export interface Inspection {
  id?: number;
  date: string;
  hiveId: string;
  queenPresent: boolean;
  queenSeen?: boolean;
  eggs?: boolean;
  brias?: boolean;
  remarks?: string;
}
