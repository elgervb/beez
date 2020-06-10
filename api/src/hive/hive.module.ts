import { Module } from '@nestjs/common';
import { HiveService } from './services/hive/hive.service';
import { HiveController } from './controller/hive/hive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiveDto } from './dto/hive';

@Module({
  controllers: [
    HiveController
  ],
  imports: [
    TypeOrmModule.forFeature([HiveDto])
  ],
  exports: [
    HiveService
  ],
  providers: [
    HiveService
  ]
})
export class HiveModule { }
