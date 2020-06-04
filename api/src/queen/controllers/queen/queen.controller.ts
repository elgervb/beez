import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { QueenService } from '../../services/queen/queen.service';
import { CreateQueenDto } from '../../dto/queen';
import { Queen } from 'src/interfaces/queen';

@Controller('queen')
export class QueenController {

  constructor(private queenService: QueenService) { }

  @Post()
  create(@Body() dto: CreateQueenDto): Queen {
    return this.queenService.create(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): void {
    this.queenService.delete(name);
  }

  @Get()
  findAll(): Queen[] {
    return this.queenService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Queen {
    return this.queenService.findOne(name);
  }
}
