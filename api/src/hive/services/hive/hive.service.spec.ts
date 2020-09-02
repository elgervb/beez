import { Test, TestingModule } from '@nestjs/testing';
import { HiveService } from './hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { HiveDto } from 'src/hive/dto/hive';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HiveService', () => {
  let service: HiveService;
  let mockRepository = {
    find: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
  };

  beforeEach(async () => {
    mockRepository.find.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HiveService,
        {
          provide: getRepositoryToken(HiveDto),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get(HiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a hive', () => {
    const expected = from<HiveDto>('beez.hive');

    service.save(expected);
    expect(mockRepository.save).toHaveBeenCalledWith(expected);

    service.findOne(expected.name, expected.number);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ name: expected.name, number: expected.number }, {});
  });

  it('should delete a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    service.delete(expected.name, expected.number);

    expect(mockRepository.delete).toHaveBeenCalledWith({ name: expected.name, number: expected.number })
  });

  it('should find all hives', () => {
    const hives = arrayFrom<HiveDto>('beez.hive', 5);
    mockRepository.find.mockReturnValue(hives);
    service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
  });

});
