import { Controller, Get } from '@nestjs/common';
import { CountsDto } from '../dtos/counts';
import { HiveService } from 'src/hive/services/hive/hive.service';
import { LocationService } from 'src/location/services/location.service';
import { QueenService } from 'src/queen/services/queen/queen.service';

@Controller('counts')
export class CountsController {

  constructor(
    private hiveService: HiveService,
    private locationService: LocationService,
    private queenService: QueenService
  ) { }

  @Get()
  getCounts(): CountsDto {
    const counts = new CountsDto();
    counts.hives = this.hiveService.findAll().length;
    counts.locations = this.locationService.findAll().length;
    counts.queens = this.queenService.findAll().length

    return counts;
  }
}
