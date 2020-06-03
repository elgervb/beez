import { register, FactoryType, from } from '@elgervb/mock-data';
import { Location } from './interfaces/location';
import { Hive } from './interfaces/hive';

export function registerBlueprints(): void {

  register<Location>('beez.location', {
    name: FactoryType.guid,
    lat: FactoryType.geo,
    long: FactoryType.geo
  });

  register<Hive>('beez.hive', {
    location: () => from('beez.location'),
    name: FactoryType.string,
    number: FactoryType.number,
    type: FactoryType.string
  });

}