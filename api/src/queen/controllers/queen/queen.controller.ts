import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { QueenService } from '../../services/queen/queen.service';
import { Queen } from 'src/interfaces/queen';
import { QueenDto } from 'src/queen/dtos/queen';
import { DeleteResult } from 'typeorm';

@Controller('queen')
export class QueenController {

  constructor(private queenService: QueenService) { }

  @Post()
  create(@Body() dto: QueenDto): Promise<Queen> {
    return this.queenService.save(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): Promise<DeleteResult> {
    return this.queenService.delete(name);
  }

  @Get()
  findAll(): Promise<Queen[]> {
    return this.queenService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Queen> {
    return this.queenService.findOne(name);
  }
}
