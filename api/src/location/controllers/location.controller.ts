import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LocationDto } from '../dtos/location';
import { LocationService } from '../services/location.service';
import { Location } from 'src/interfaces/location';

@Controller('location')
export class LocationController {

  constructor(private locationService: LocationService) { }

  @Post()
  create(@Body() dto: LocationDto): Promise<Location> {
    return this.locationService.save(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): void {
    this.locationService.delete(name);
  }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Location> {
    return this.locationService.findOne(name);
  }
}
