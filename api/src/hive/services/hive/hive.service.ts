import { Injectable } from '@nestjs/common';
import { Hive } from 'src/interfaces/hive';
import { InjectRepository } from '@nestjs/typeorm';
import { HiveDto } from 'src/hive/dto/hive';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class HiveService {

  constructor(@InjectRepository(HiveDto) private hiveRepository: Repository<Hive>) { }

  async save(hive: Hive): Promise<Hive> {
    if (hive.id) {
      const existing = await this.hiveRepository.findOne(hive.id);
      return await this.hiveRepository.save({ ...hive, id: existing.id });
    }
    return this.hiveRepository.save(hive);
  }

  delete(name: string, nr: number): Promise<DeleteResult> {
    return this.hiveRepository.delete({ name, number: nr });
  }

  findAll(): Promise<Hive[]> {
    return this.hiveRepository.find({
      join: {
        alias: "hive",
        leftJoinAndSelect: {
          location: "hive.location"
        }
      }
    });
  }

  findOne(name: string, nr: number): Promise<Hive> {
    return this.hiveRepository.findOne({ name, number: nr }, {});
  }
}
