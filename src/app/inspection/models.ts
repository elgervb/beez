import { Timestamp } from '../hive/models';

export interface Inspection {
  /** The date the inspection was taken */
  date: Timestamp;
  /** did you see any drones? */
  drones: boolean;
  /** did you see the queen? */
  queen: boolean;
  /** are there any fresh eggs present? (first 3 days) */
  eggs: boolean;
  /** is there open brood with white larva? (day 4 to 7) */
  larva: boolean;
  /** is there closed brood? (day 8 - 21) */
  closedBrood: boolean;
  /** is any of it drone brood? */
  droneBrood: boolean;
  /** did you see qrueen brood? */
  queenBrood: boolean;
  /** Honey present in the honey super */
  honey: number;
  /** Closed honey present in the honey super */
  honeyClosed: number;
  /** Honey present in the hive body, used as food for the bees. Not for harvesting */
  honeyFood: number;
  /** The total health of the hive, body + honey super */
  health: number;
  /** any additional remarks on the hive's state */
  remarks?: string;
}
