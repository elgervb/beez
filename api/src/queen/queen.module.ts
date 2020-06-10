import { Module } from '@nestjs/common';
import { QueenController } from './controllers/queen/queen.controller';
import { QueenService } from './services/queen/queen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueenDto } from './dtos/queen';

@Module({
  controllers: [
    QueenController
  ],
  imports: [
    TypeOrmModule.forFeature([QueenDto])
  ],
  exports: [
    QueenService
  ],
  providers: [
    QueenService
  ]
})
export class QueenModule { }
