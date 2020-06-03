import { Hive } from "src/interfaces/hive";
import { Location } from "src/interfaces/location";


export class CreateHiveDto implements Hive {
  name: string;
  number: number;
  location?: Location;
  type?: string;
}
