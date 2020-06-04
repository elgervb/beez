import { register, FactoryType, from } from '@elgervb/mock-data';
import { Location } from './interfaces/location';
import { Hive } from './interfaces/hive';
import { Queen } from './interfaces/queen';

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

  register<Queen>('beez.queen', {
    active: FactoryType.boolean,
    bought: FactoryType.boolean,
    color: FactoryType.hex,
    name: FactoryType.string,
    year: FactoryType.year
  });

}