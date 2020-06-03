import { Injectable } from '@nestjs/common';
import { Location } from 'src/interfaces/location';
import { arrayFrom } from '@elgervb/mock-data';

@Injectable()
export class LocationService {

  private locations = [...arrayFrom<Location>('beez.location', 10), { name: 'My Hive 1', long: 51.829711, lat: 5.8793828 }];

  create(location: Location): Location {
    this.locations = [...this.locations, location];

    return location;
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
