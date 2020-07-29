import { Test, TestingModule } from '@nestjs/testing';
import { HiveService } from './hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { HiveDto } from 'src/hive/dto/hive';

describe('HiveService', () => {
  let service: HiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiveService],
    }).compile();

    service = module.get<HiveService>(HiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and find a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    expect(service.save(expected)).toEqual(expected);
    expect(service.findOne(expected.name, expected.number)).toEqual(expected);
  });

  it('should delete a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    expect(service.save(expected)).toEqual(expected);

    service.delete(expected.name, expected.number);

    expect(service.findOne(expected.name, expected.number)).toBeFalsy();
  });

  it('should find all hives', () => {
    const hives = arrayFrom<HiveDto>('beez.hive', 5);
    hives.forEach(hive => service.save(hive));

    expect(service.findAll()).toHaveLength(7);
  });

});
