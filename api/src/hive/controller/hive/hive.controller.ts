import { Controller, Param, Get, Delete, Body, Post } from '@nestjs/common';
import { CreateHiveDto } from '../../dto/hive';
import { HiveService } from '../../services/hive/hive.service';
import { Hive } from 'src/interfaces/hive';

@Controller('hive')
export class HiveController {

  constructor(private hiveService: HiveService) { }

  @Post()
  create(@Body() dto: CreateHiveDto): Hive {
    return this.hiveService.create(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): void {
    this.hiveService.delete(name);
  }

  @Get()
  findAll(): Hive[] {
    return this.hiveService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Hive {
    return this.hiveService.findOne(name);
  }

}
