import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { CreateLocationDto } from '../dto/location';

@Controller('location')
export class LocationController {

  private readonly logger = new Logger(LocationController.name);

  @Get()
  findAll(): string {
    this.logger.debug('findAll');

    return 'This action returns all locations';
  }

  @Post()
  async create(@Body() dto: CreateLocationDto) {
    return `This action adds a new location ${dto.name}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} location`;
  }

}
