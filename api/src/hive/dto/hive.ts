import { Hive } from "src/interfaces/hive";
import { Location } from "src/interfaces/location";
import { Column, ObjectIdColumn, Entity } from "typeorm";

@Entity({ name: 'hive' })
export class HiveDto implements Hive {

  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  location?: Location;

  @Column({ nullable: true })
  type?: string;
}
