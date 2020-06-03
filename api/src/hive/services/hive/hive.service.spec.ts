import { Test, TestingModule } from '@nestjs/testing';
import { HiveService } from './hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { Hive } from 'src/interfaces/hive';

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
    const expected = from<Hive>('beez.hive');
    expect(service.create(expected)).toEqual(expected);
    expect(service.findOne(expected.name)).toEqual(expected);
  });

  it('should delete a hive', () => {
    const expected = from<Hive>('beez.hive');
    expect(service.create(expected)).toEqual(expected);

    service.delete(expected.name);

    expect(service.findOne(expected.name)).toBeFalsy();
  });

  it('should find all hives', () => {
    const hives = arrayFrom<Hive>('beez.hive', 5);
    hives.forEach(hive => service.create(hive));

    expect(service.findAll()).toHaveLength(7);
  });

});
