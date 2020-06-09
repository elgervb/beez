import { Module } from '@nestjs/common';
import { HiveService } from './services/hive/hive.service';
import { HiveController } from './controller/hive/hive.controller';

@Module({
  controllers: [
    HiveController
  ],
  exports: [
    HiveService
  ],
  providers: [
    HiveService
  ]
})
export class HiveModule { }
