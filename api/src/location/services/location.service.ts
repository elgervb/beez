import { Injectable } from '@nestjs/common';
import { Location } from 'src/interfaces/location';
import { arrayFrom } from '@elgervb/mock-data';

@Injectable()
export class LocationService {

  private data = [...arrayFrom<Location>('beez.location', 10), { name: 'My Hive 1', long: 51.829711, lat: 5.8793828 }];

  create(location: Location): Location {
    this.data = [...this.data, location];

    return location;
  }

  delete(locationName: string): void {
    this.data = this.data.filter(location => location.name !== locationName);
  }

  findAll(): Location[] {
    return [...this.data];
  }

  findOne(name: string) {
    return this.data.find(location => location.name === name);
  }
}
