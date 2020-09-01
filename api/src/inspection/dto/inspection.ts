import { Inspection } from 'src/interfaces/inspection';
import { Column, ObjectIdColumn, Entity } from 'typeorm';

@Entity({ name: 'inspection' })
export class InspectionDto implements Inspection {

  @ObjectIdColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  hiveId: string;

  @Column()
  queenPresent: boolean;

  @Column({ nullable: true })
  queenSeen?: boolean;

  @Column({ nullable: true })
  eggs?: boolean;

  @Column({ nullable: true })
  brias?: boolean;

  @Column({ nullable: true })
  remarks?: string;
}
