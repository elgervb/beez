
export interface Inspection {
  id?: number;
  date: Date;
  hiveId: string;
  queenPresent: boolean;
  queenSeen?: boolean;
  eggs?: boolean;
  brias?: boolean;
  remarks?: string;
}
