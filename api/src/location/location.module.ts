import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationDto } from './dtos/location';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationDto])
  ],
  controllers: [
    LocationController
  ],
  exports: [
    LocationService
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
