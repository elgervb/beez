import { Test, TestingModule } from '@nestjs/testing';
import { InspectionController } from './inspection.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InspectionDto } from '../dto/inspection';
import { InspectionService } from '../services/inspection/inspection.service';

describe('Inspection Controller', () => {
  let controller: InspectionController;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        InspectionController
      ],
      providers: [
        InspectionService,
        {
          provide: getRepositoryToken(InspectionDto),
          useValue: mockRepository,
        }
      ]
    }).compile();

    controller = module.get<InspectionController>(InspectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
