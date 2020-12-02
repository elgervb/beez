import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HiveDto } from 'src/hive/dto/hive';
import { InspectionDto } from 'src/inspection/dto/inspection';
import { LocationDto } from 'src/location/dtos/location';
import { QueenDto } from 'src/queen/dtos/queen';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(QueenDto),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(InspectionDto),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(LocationDto),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(HiveDto),
          useValue: mockRepository,
        }
      ]
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
