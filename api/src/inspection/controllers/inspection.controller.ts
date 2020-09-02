import { Controller, UseGuards, Post, Get, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InspectionService } from '../services/inspection/inspection.service';
import { Inspection } from 'src/interfaces/inspection';

@UseGuards(JwtAuthGuard)
@Controller('inspection')
export class InspectionController {

  constructor(private inspectionService: InspectionService) { }

  @Post()
  create(@Body() dto: Inspection) {
    return this.inspectionService.save(dto);
  }

  @Get(':hiveId')
  findAll(@Param('hiveId') hiveId: string) {
    return this.inspectionService.findAll(hiveId);
  }

  @Get(':hiveId/:id')
  findOne(@Param('hiveId') _: string, @Param('id') id: string) {
    return this.inspectionService.findOne(id);
  }
}
