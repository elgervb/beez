
import { register, FactoryType } from '@elgervb/mock-data';
import { Location } from '@common/interfaces/location';

register<Location>('beez.location', {
  name: FactoryType.guid,
  lat: FactoryType.geo,
  long: FactoryType.geo
});
