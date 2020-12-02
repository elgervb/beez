import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiveDto } from 'src/hive/dto/hive';
import { InspectionDto } from 'src/inspection/dto/inspection';
import { LocationDto } from 'src/location/dtos/location';
import { QueenDto } from 'src/queen/dtos/queen';
import { OverviewController } from './controller/overview/overview.controller';
import { DashboardService } from './services/dashboard/dashboard.service';

@Module({
  controllers: [OverviewController],
  providers: [DashboardService],
  imports: [
    TypeOrmModule.forFeature([HiveDto, InspectionDto, QueenDto, LocationDto])
  ],
})
export class DashboardModule { }
