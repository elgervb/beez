import { Location } from "@common/interfaces/location";

export class CreateLocationDto implements Location {
  name: string;
  long: number;
  lat: number;
}