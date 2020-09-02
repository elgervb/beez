import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';
import { arrayFrom, from } from '@elgervb/mock-data/lib/blueprint/blueprint';
import { LocationDto } from '../dtos/location';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Location Controller', () => {
  let controller: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        JwtAuthGuard,
        {
          provide: getRepositoryToken(LocationDto),
          useValue: mockRepository,
        },
      ]
    }).compile();

    controller = module.get(LocationController);
    locationService = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', async () => {
    const expected = from<LocationDto>('beez.location');
    jest.spyOn(locationService, 'save').mockReturnValueOnce(Promise.resolve(expected));
    expect(await controller.create(expected)).toEqual(expected);
  });

  it('should delete a location', () => {
    const expected = from<LocationDto>('beez.location');
    const deleteSpy = jest.spyOn(locationService, 'delete').mockResolvedValue({ raw: '' });
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', async () => {
    const expected = arrayFrom<LocationDto>('beez.location', 2);
    jest.spyOn(locationService, 'findAll').mockResolvedValue(expected);
    expect(await controller.findAll()).toEqual(expected);
  });

  it('should find one', async () => {
    const expected = from<LocationDto>('beez.location');
    jest.spyOn(locationService, 'findOne').mockResolvedValue(expected);
    expect(await controller.findOne('')).toEqual(expected);
  });
});
