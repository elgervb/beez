import { Inspection } from "./inspection";

export interface DashboardOverview {
  locations: number;
  queens: number;
  hives: number;
  inspections: number;
  lastesInspections: Inspection[]
}
