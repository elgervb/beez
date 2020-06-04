import { Module } from '@nestjs/common';
import { QueenController } from './controllers/queen/queen.controller';
import { QueenService } from './services/queen/queen.service';

@Module({
  controllers: [QueenController],
  providers: [QueenService]
})
export class QueenModule {}
