import { Location } from "./location";

export interface Hive {
  name: string;
  number: number;
  location?: Location;
  type?: string;
}