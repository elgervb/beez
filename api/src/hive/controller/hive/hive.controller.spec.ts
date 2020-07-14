import { Test, TestingModule } from '@nestjs/testing';
import { HiveController } from './hive.controller';
import { HiveService } from '../../services/hive/hive.service';
import { arrayFrom, from } from '@elgervb/mock-data';
import { Hive } from 'src/interfaces/hive';

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
    const expected = from<Hive>('beez.hive');
    jest.spyOn(hiveService, 'create').mockReturnValueOnce(expected);
    expect(controller.create(expected)).toEqual(expected);
  });

  it('should create a hive', () => {
    const expected = from<Hive>('beez.hive');
    const deleteSpy = jest.spyOn(hiveService, 'delete');
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', () => {
    const expected = arrayFrom<Hive>('beez.hive', 2);
    jest.spyOn(hiveService, 'findAll').mockReturnValueOnce(expected);
    expect(controller.findAll()).toEqual(expected);
  });

  it('should find one', () => {
    const expected = from<Hive>('beez.hive');
    jest.spyOn(hiveService, 'findOne').mockReturnValueOnce(expected);
    expect(controller.findOne('')).toEqual(expected);
  });
});
