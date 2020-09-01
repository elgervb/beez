import { Injectable } from '@nestjs/common';
import { InspectionDto } from '../../dto/inspection';
import { InjectRepository } from '@nestjs/typeorm';
import { Inspection } from 'src/interfaces/inspection';
import { Repository, ObjectID } from 'typeorm';
import { Hive } from 'src/interfaces/hive';

@Injectable()
export class InspectionService {

  constructor(
    @InjectRepository(InspectionDto)
    private inspectionRepository: Repository<Inspection>
  ) { }

  async save(inspection: Inspection): Promise<Inspection> {
    if (inspection.id) {
      const existing = await this.inspectionRepository.findOne(inspection.id);
      return await this.inspectionRepository.save({ ...inspection, id: existing.id });
    }
    return this.inspectionRepository.save(inspection);
  }

  /**
   * Returns all inspections for a hive
   */
  findAll(hive: Hive): Promise<Inspection[]> {
    return this.inspectionRepository.find({
      where: {
        hiveId: hive.id
      }
    });
  }

  findOne(id: string | ObjectID): Promise<Inspection> {
    return this.inspectionRepository.findOne(id);
  }
}
