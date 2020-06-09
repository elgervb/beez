import { Counts } from "src/interfaces/counts";

export class CountsDto implements Counts {
  hives: number;
  locations: number;
  queens: number;
}