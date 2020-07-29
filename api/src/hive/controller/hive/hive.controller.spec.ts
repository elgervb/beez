import { Test, TestingModule } from '@nestjs/testing';
import { HiveController } from './hive.controller';
import { HiveService } from '../../services/hive/hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { HiveDto } from 'src/hive/dto/hive';

describe('Hive Controller', () => {
  let controller: HiveController;
  let hiveService: HiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiveController],
      providers: [HiveService]
    }).compile();

    controller = module.get(HiveController);
    hiveService = module.get(HiveService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    jest.spyOn(hiveService, 'save').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.create(expected)).toEqual(expected);
  });

  it('should create a hive', () => {
    const expected = from<HiveDto>('beez.hive');
    const deleteSpy = jest.spyOn(hiveService, 'delete');
    controller.delete(expected.name, expected.number);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', () => {
    const expected = arrayFrom<HiveDto>('beez.hive', 2);
    jest.spyOn(hiveService, 'findAll').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.findAll()).toEqual(expected);
  });

  it('should find one', () => {
    const expected = from<HiveDto>('beez.hive');
    jest.spyOn(hiveService, 'findOne').mockReturnValueOnce(Promise.resolve(expected));
    expect(controller.findOne('', 0)).toEqual(expected);
  });
});
