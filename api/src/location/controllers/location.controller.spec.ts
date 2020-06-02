import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';
import { arrayFrom, from } from '@elgervb/mock-data/lib/blueprint/blueprint';
import { Location } from 'src/interfaces/location';

describe('Location Controller', () => {
  let controller: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService
      ]
    }).compile();

    controller = module.get(LocationController);
    locationService = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', () => {
    const expected = from<Location>('beez.location');
    jest.spyOn(locationService, 'create').mockReturnValueOnce(expected);
    expect(controller.create(expected)).toEqual(expected);
  });

  it('should create a location', () => {
    const expected = from<Location>('beez.location');
    const deleteSpy = jest.spyOn(locationService, 'delete');
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', () => {
    const expected = arrayFrom<Location>('beez.location', 2);
    jest.spyOn(locationService, 'findAll').mockReturnValueOnce(expected);
    expect(controller.findAll()).toEqual(expected);
  });

  it('should find one', () => {
    const expected = from<Location>('beez.location');
    jest.spyOn(locationService, 'findOne').mockReturnValueOnce(expected);
    expect(controller.findOne('')).toEqual(expected);
  })
});
