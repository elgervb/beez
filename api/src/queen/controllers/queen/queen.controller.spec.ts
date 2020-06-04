import { Test, TestingModule } from '@nestjs/testing';
import { QueenController } from './queen.controller';
import { QueenService } from '../../services/queen/queen.service';
import { from, arrayFrom } from '@elgervb/mock-data';
import { Queen } from 'src/interfaces/queen';

describe('Queen Controller', () => {
  let controller: QueenController;
  let queenService: QueenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueenController],
      providers: [QueenService]
    }).compile();

    controller = module.get(QueenController);
    queenService = module.get(QueenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(queenService).toBeDefined();
  });

  it('should create a queen', () => {
    const expected = from<Queen>('beez.queen');
    jest.spyOn(queenService, 'create').mockReturnValueOnce(expected);
    expect(controller.create(expected)).toEqual(expected);
  });

  it('should create a queen', () => {
    const expected = from<Queen>('beez.queen');
    const deleteSpy = jest.spyOn(queenService, 'delete');
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', () => {
    const expected = arrayFrom<Queen>('beez.queen', 2);
    jest.spyOn(queenService, 'findAll').mockReturnValueOnce(expected);
    expect(controller.findAll()).toEqual(expected);
  });

  it('should find one', () => {
    const expected = from<Queen>('beez.queen');
    jest.spyOn(queenService, 'findOne').mockReturnValueOnce(expected);
    expect(controller.findOne('')).toEqual(expected);
  });
});
