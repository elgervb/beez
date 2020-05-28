import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
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
  create(@Body() dto: CreateLocationDto): void {
    this.locationService.create(dto);
  }

  @Get(':name')
  findOne(@Param('name') name: string): Location {
    return this.locationService.findOne(name);
  }

  @Delete(':name')
  delete(@Param('name') name: string): void {
    this.locationService.delete(name);
  }

}
