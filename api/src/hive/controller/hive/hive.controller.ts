import { Controller, Param, Get, Delete, Body, Post, ParseIntPipe } from '@nestjs/common';
import { HiveDto } from '../../dto/hive';
import { HiveService } from '../../services/hive/hive.service';
import { Hive } from 'src/interfaces/hive';
import { DeleteResult } from 'typeorm';

@Controller('hive')
export class HiveController {

  constructor(private hiveService: HiveService) { }

  @Post()
  create(@Body() dto: HiveDto): Promise<Hive> {
    return this.hiveService.save(dto);
  }

  @Delete(':name/:nr')
  delete(@Param('name') name: string, @Param('nr', ParseIntPipe) nr: number): Promise<DeleteResult> {
    return this.hiveService.delete(name, nr);
  }

  @Get()
  findAll(): Promise<Hive[]> {
    return this.hiveService.findAll();
  }

  @Get(':name/:nr')
  findOne(@Param('name') name: string, @Param('nr', ParseIntPipe) nr: number): Promise<Hive> {
    return this.hiveService.findOne(name, nr);
  }

}
