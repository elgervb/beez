import { Test, TestingModule } from '@nestjs/testing';
import { QueenService } from './queen.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { QueenDto } from 'src/queen/dtos/queen';

describe('QueenService', () => {
  let service: QueenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueenService],
    }).compile();

    service = module.get(QueenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a queen', () => {
    const expected = from<QueenDto>('beez.queen');
    expect(service.save(expected)).toEqual(expected);
    expect(service.findOne(expected.name)).toEqual(expected);
  });

  it('should delete a queen', () => {
    const expected = from<QueenDto>('beez.queen');
    expect(service.save(expected)).toEqual(expected);

    service.delete(expected.name);

    expect(service.findOne(expected.name)).toBeFalsy();
  });

  it('should find all queens', () => {
    const queens = arrayFrom<QueenDto>('beez.queen', 5);
    queens.forEach(queen => service.save(queen));

    expect(service.findAll()).toHaveLength(7);
  });
});
