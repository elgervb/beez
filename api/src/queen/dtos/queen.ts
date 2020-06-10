import { Queen } from "src/interfaces/queen";
import { ObjectIdColumn, Column, Entity, OneToOne } from "typeorm";

@Entity({ name: 'queen' })
export class QueenDto implements Queen {
  @ObjectIdColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  wingsCut?: boolean;

  @Column()
  year: number;

  @OneToOne(() => QueenDto)
  mother?: Queen;

  @Column({ default: false })
  bought: boolean;

  @Column()
  boughtFrom?: string;

  @Column({ default: true })
  active: boolean;
}