import { Test, TestingModule } from '@nestjs/testing';
import { InspectionService } from './inspection.service';
import { InspectionDto } from 'src/inspection/dto/inspection';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InspectionService', () => {
  let service: InspectionService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionService,
        {
          provide: getRepositoryToken(InspectionDto),
          useValue: mockRepository,
        },
      ]
    }).compile();

    service = module.get<InspectionService>(InspectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
