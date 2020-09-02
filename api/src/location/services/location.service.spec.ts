import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { from, } from '@elgervb/mock-data';
import { arrayFrom } from '@elgervb/mock-data/lib/blueprint/blueprint';
import { Location } from 'src/interfaces/location';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationDto } from '../dtos/location';

describe('LocationService', () => {
  let service: LocationService;
  let mockRepository = {
    find: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn()
  };

  beforeEach(async () => {
    mockRepository.find.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.findOne.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(LocationDto),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a location', () => {
    const expected = from<Location>('beez.location');
    service.findOne(expected.name);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ name: expected.name });
  });

  it('should delete a location', () => {
    const expected = from<Location>('beez.location');
    service.delete(expected.name);

    expect(mockRepository.delete).toHaveBeenCalledWith({ name: expected.name });
  });

  it('should find all locations', () => {
    const locations = arrayFrom<Location>('beez.location', 5);
    mockRepository.find.mockReturnValue(locations);
    service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
  });

});
