import { Injectable } from '@nestjs/common';
import { InspectionDto } from '../../dto/inspection';
import { InjectRepository } from '@nestjs/typeorm';
import { Inspection } from 'src/interfaces/inspection';
import { Repository, ObjectID } from 'typeorm';

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
  findAll(hiveId: string): Promise<Inspection[]> {
    return this.inspectionRepository.find({
      where: {
        hiveId
      }
    });
  }

  findOne(id: string | ObjectID): Promise<Inspection> {
    return this.inspectionRepository.findOne(id);
  }
}
