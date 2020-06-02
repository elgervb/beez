
import { register, FactoryType } from '@elgervb/mock-data';
import { Location } from './location/interfaces/location';

register<Location>('beez.location', {
  name: FactoryType.guid,
  lat: FactoryType.geo,
  long: FactoryType.geo
});
