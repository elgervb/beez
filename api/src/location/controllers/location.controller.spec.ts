import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';
import { arrayFrom, from } from '@elgervb/mock-data/lib/blueprint/blueprint';
import { LocationDto } from '../dtos/location';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('Location Controller', () => {
  let controller: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        JwtAuthGuard
      ]
    }).compile();

    controller = module.get(LocationController);
    locationService = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', () => {
    const expected = from<LocationDto>('beez.location');
    jest.spyOn(locationService, 'save').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.create(expected)).toEqual(expected);
  });

  it('should create a location', () => {
    const expected = from<LocationDto>('beez.location');
    const deleteSpy = jest.spyOn(locationService, 'delete');
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', () => {
    const expected = arrayFrom<LocationDto>('beez.location', 2);
    jest.spyOn(locationService, 'findAll').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.findAll()).toEqual(expected);
  });

  it('should find one', () => {
    const expected = from<LocationDto>('beez.location');
    jest.spyOn(locationService, 'findOne').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.findOne('')).toEqual(expected);
  });
});
