import { Counts } from "src/interfaces/counts";
import { ObjectIdColumn, Column } from "typeorm";

export class CountsDto implements Counts {

  @ObjectIdColumn()
  id: number;

  @Column()
  hives: number;

  @Column()
  locations: number;

  @Column()
  queens: number;
}