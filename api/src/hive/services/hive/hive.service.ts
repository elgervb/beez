import { Injectable } from '@nestjs/common';
import { arrayFrom } from '@elgervb/mock-data';
import { Hive } from 'src/interfaces/hive';

@Injectable()
export class HiveService {

  private data = [...arrayFrom<Hive>('beez.hive', 2)];

  create(hive: Hive): Hive {
    this.data = [...this.data, hive];

    return hive;
  }

  delete(hiveName: string): void {
    this.data = this.data.filter(hive => hive.name !== hiveName);
  }

  findAll(): Hive[] {
    return [...this.data];
  }

  findOne(name: string): Hive {
    return this.data.find(hive => hive.name === name);
  }
}
