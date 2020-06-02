import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CreateLocationDto } from '../dto/location';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location';

@Controller('location')
export class LocationController {

  constructor(private locationService: LocationService) { }

  @Post()
  create(@Body() dto: CreateLocationDto): Location {
    return this.locationService.create(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): void {
    this.locationService.delete(name);
  }

  @Get()
  findAll(): Location[] {
    return this.locationService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Location {
    return this.locationService.findOne(name);
  }



}
