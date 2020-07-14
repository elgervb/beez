import { Location } from './location';

export interface Hive {
  id?: number;
  name: string;
  number: number;
  location?: Location;
  type?: string;
}
