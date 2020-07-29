import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { from, } from '@elgervb/mock-data';
import { arrayFrom } from '@elgervb/mock-data/lib/blueprint/blueprint';
import { Location } from 'src/interfaces/location';
import { Repository } from 'typeorm';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, Repository],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a location', () => {
    const expected = from<Location>('beez.location');
    expect(service.save(expected)).toEqual(expected);
    expect(service.findOne(expected.name)).toEqual(expected);
  });

  it('should delete a location', () => {
    const expected = from<Location>('beez.location');
    expect(service.save(expected)).toEqual(expected);

    service.delete(expected.name);

    expect(service.findOne(expected.name)).toBeFalsy();
  });

  it('should find all locations', () => {
    const locations = arrayFrom<Location>('beez.location', 5);
    locations.forEach(location => service.save(location));

    expect(service.findAll()).toHaveLength(16);
  });

});
