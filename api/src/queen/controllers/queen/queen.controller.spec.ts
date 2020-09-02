import { Test, TestingModule } from '@nestjs/testing';
import { QueenController } from './queen.controller';
import { QueenService } from '../../services/queen/queen.service';
import { from, arrayFrom } from '@elgervb/mock-data';
import { QueenDto } from 'src/queen/dtos/queen';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Queen Controller', () => {
  let controller: QueenController;
  let queenService: QueenService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueenController],
      providers: [
        QueenService,
        {
          provide: getRepositoryToken(QueenDto),
          useValue: mockRepository,
        }
      ]
    }).compile();

    controller = module.get(QueenController);
    queenService = module.get(QueenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(queenService).toBeDefined();
  });

  it('should create a queen', async () => {
    const expected = from<QueenDto>('beez.queen');
    jest.spyOn(queenService, 'save').mockResolvedValue(expected);
    expect(await controller.create(expected)).toEqual(expected);
  });

  it('should delete a queen', () => {
    const expected = from<QueenDto>('beez.queen');
    const deleteSpy = jest.spyOn(queenService, 'delete').mockResolvedValue({ raw: '' });
    controller.delete(expected.name);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should find all', async () => {
    const expected = arrayFrom<QueenDto>('beez.queen', 2);
    jest.spyOn(queenService, 'findAll').mockResolvedValue(expected);
    expect(await controller.findAll()).toEqual(expected);
  });

  it('should find one', async () => {
    const expected = from<QueenDto>('beez.queen');
    jest.spyOn(queenService, 'findOne').mockResolvedValue(expected);
    expect(await controller.findOne('')).toEqual(expected);
  });
});
