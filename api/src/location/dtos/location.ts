import { Location } from 'src/interfaces/location';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'location' })
export class LocationDto implements Location {

  @ObjectIdColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  long: number;

  @Column()
  lat: number;
}
