import { Injectable } from '@nestjs/common';
import { Location } from 'src/location/interfaces/location';

@Injectable()
export class LocationService {

  private locations: Location[] = [];

  create(location: Location): void {
    this.locations = [...this.locations, location];
  }

  delete(locationName: string): void {
    this.locations = this.locations.filter(location => location.name !== locationName);
  }

  findAll(): Location[] {
    return [...this.locations];
  }

  findOne(name: string) {
    return this.locations.find(location => location.name === name);
  }
}
