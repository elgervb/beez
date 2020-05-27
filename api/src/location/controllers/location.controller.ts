import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { CreateLocationDto } from '../dto/location';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location';

@Controller('location')
export class LocationController {

  private readonly logger = new Logger(LocationController.name);

  constructor(private locationService: LocationService) { }

  @Get()
  findAll(): Location[] {
    this.logger.debug(this.findAll.name);

    return this.locationService.findAll();
  }

  @Post()
  create(@Body() dto: CreateLocationDto) {
    this.logger.debug(this.create.name);

    this.locationService.create(dto);
  }

  @Get(':id')
  findOne(@Param('name') name: string): Location {
    return this.locationService.findOne(name);
  }

}
