import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './location/location.controller';

@Module({
  imports: [],
  controllers: [AppController, LocationController],
  providers: [AppService],
})
export class AppModule {}
