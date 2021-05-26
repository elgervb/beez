export interface Inspection {
  date: Date;
  drones: boolean;
  queen: boolean;
  eggs: boolean;
  larva: boolean;
  closedBrood: boolean;
  droneBrood: boolean;
  queenBrood: boolean;
  honey: number;
  honeyClosed: number;
  health: number;
  remarks: string;
}
