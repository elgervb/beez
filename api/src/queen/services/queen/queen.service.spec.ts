import { Test, TestingModule } from '@nestjs/testing';
import { QueenService } from './queen.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { QueenDto } from 'src/queen/dtos/queen';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QueenService', () => {
  let service: QueenService;
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
        QueenService,
        {
          provide: getRepositoryToken(QueenDto),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get(QueenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a queen', () => {
    const expected = from<QueenDto>('beez.queen');
    service.findOne(expected.name);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ name: expected.name });
  });

  it('should delete a queen', () => {
    const expected = from<QueenDto>('beez.queen');
    service.delete(expected.name);

    expect(mockRepository.delete).toHaveBeenCalledWith({ name: expected.name });
  });

  it('should find all queens', () => {
    const queens = arrayFrom<QueenDto>('beez.queen', 5);
    mockRepository.find.mockReturnValue(queens);
    service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
  });
});
