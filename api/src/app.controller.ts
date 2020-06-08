import { Controller, Get } from '@nestjs/common';
import { AppService, AppDetails } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('details')
  details(): AppDetails {
    return this.appService.getDetails();
  }

}
