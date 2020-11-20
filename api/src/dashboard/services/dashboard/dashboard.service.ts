import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HiveDto } from 'src/hive/dto/hive';
import { InspectionDto } from 'src/inspection/dto/inspection';
import { DashboardOverview } from 'src/interfaces/dashboard-overview';
import { LocationDto } from 'src/location/dtos/location';
import { QueenDto } from 'src/queen/dtos/queen';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {

  constructor(
    @InjectRepository(QueenDto) private queenRepository: Repository<QueenDto>,
    @InjectRepository(InspectionDto) private inspectionRepository: Repository<InspectionDto>,
    @InjectRepository(LocationDto) private locationRepository: Repository<LocationDto>,
    @InjectRepository(HiveDto) private hiveRepository: Repository<HiveDto>
  ) { }

  async find(): Promise<DashboardOverview> {
    return Promise.all([
      this.hiveRepository.find(),
      this.queenRepository.find(),
      this.locationRepository.find(),
      this.inspectionRepository.find(),
      this.inspectionRepository.find({ take: 5 })
    ]).then(([hives, queens, locations, inspections, latestInspections]) => {
      return {
        hives: hives.length,
        inspections: inspections.length,
        lastesInspections: latestInspections,
        queens: queens.length,
        locations: locations.length
      };
    });
  }


}
