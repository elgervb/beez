import { Module } from '@nestjs/common';
import { InspectionController } from './controllers/inspection.controller';
import { InspectionService } from './services/inspection/inspection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionDto } from './dto/inspection';

@Module({
  imports: [
    TypeOrmModule.forFeature([InspectionDto])
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule { }
