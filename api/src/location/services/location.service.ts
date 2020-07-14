import { Injectable } from '@nestjs/common';
import { Location } from 'src/interfaces/location';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDto } from '../dtos/location';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(LocationDto)
    private locationRepository: Repository<LocationDto>
  ) { }


  async save(location: LocationDto): Promise<LocationDto> {
    if (location.id) {
      const existing = await this.locationRepository.findOne(location.id);
      return await this.locationRepository.save({ ...location, id: existing.id });
    }
    return this.locationRepository.save(location);
  }

  delete(name: string): Promise<DeleteResult> {
    return this.locationRepository.delete({ name });
  }

  findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findOne(name: string) {
    return this.locationRepository.findOne({ name });
  }
}
