import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateLocationDto } from '../dto/location';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location';

@Controller('location')
export class LocationController {

  constructor(private locationService: LocationService) { }

  @Get()
  findAll(): Location[] {
    return this.locationService.findAll();
  }

  @Post()
  create(@Body() dto: CreateLocationDto) {
    this.locationService.create(dto);
  }

  @Get(':id')
  findOne(@Param('name') name: string): Location {
    return this.locationService.findOne(name);
  }

}
