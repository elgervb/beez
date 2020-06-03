import { Module } from '@nestjs/common';
import { HiveService } from './services/hive/hive.service';
import { HiveController } from './controller/hive/hive.controller';

@Module({
  providers: [HiveService],
  controllers: [HiveController]
})
export class HiveModule {}
