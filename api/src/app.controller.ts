import { Controller, Get } from '@nestjs/common';
import { AppService, AppDetails } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  details(): AppDetails {
    return this.appService.getDetails();
  }

}
