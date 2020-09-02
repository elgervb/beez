import { Test, TestingModule } from '@nestjs/testing';
import { HiveController } from './hive.controller';
import { HiveService } from '../../services/hive/hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { HiveDto } from 'src/hive/dto/hive';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Hive Controller', () => {
  let controller: HiveController;
  let hiveService: HiveService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiveController],
      providers: [
        HiveService,
        {
          provide: getRepositoryToken(HiveDto),
          useValue: mockRepository,
        },
      ]
    }).compile();

    controller = module.get(HiveController);
    hiveService = module.get(HiveService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a hive', async () => {
    const expected = from<HiveDto>('beez.hive');
    jest.spyOn(hiveService, 'save').mockReturnValueOnce(Promise.resolve(expected));
    expect(await controller.create(expected)).toEqual(expected);
  });

  it('should create a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    const deleteSpy = jest.spyOn(hiveService, 'delete').mockResolvedValue({ raw: '' });
    controller.delete(expected.name, expected.number);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', async () => {
    const expected = arrayFrom<HiveDto>('beez.hive', 2);
    jest.spyOn(hiveService, 'findAll').mockReturnValueOnce(Promise.resolve(expected));
    expect(await controller.findAll()).toEqual(expected);
  });

  it('should find one', async () => {
    const expected = from<HiveDto>('beez.hive');
    jest.spyOn(hiveService, 'findOne').mockReturnValueOnce(Promise.resolve(expected));
    expect(await controller.findOne('', 0)).toEqual(expected);
  });
});
