import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardService } from 'src/dashboard/services/dashboard/dashboard.service';
import { HiveDto } from 'src/hive/dto/hive';
import { InspectionDto } from 'src/inspection/dto/inspection';
import { LocationDto } from 'src/location/dtos/location';
import { QueenDto } from 'src/queen/dtos/queen';
import { OverviewController } from './overview.controller';

describe('Overview Controller', () => {
  let controller: OverviewController;
  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverviewController],
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

    controller = module.get<OverviewController>(OverviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
