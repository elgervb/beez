import { Module } from '@nestjs/common';
import { CountsController } from './controllers/counts.controller';
import { HiveModule } from 'src/hive/hive.module';
import { LocationModule } from 'src/location/location.module';
import { QueenModule } from 'src/queen/queen.module';

@Module({
  controllers: [CountsController],
  imports: [
    HiveModule,
    LocationModule,
    QueenModule
  ]
})
export class CountsModule { }
