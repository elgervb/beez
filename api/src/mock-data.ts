import { register, FactoryType } from '@elgervb/mock-data';
import { Location } from './interfaces/location';

export function registerBlueprints(): void {

  register<Location>('beez.location', {
    name: FactoryType.guid,
    lat: FactoryType.geo,
    long: FactoryType.geo
  });

}