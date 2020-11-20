import { Controller, Get } from '@nestjs/common';
import { DashboardService } from 'src/dashboard/services/dashboard/dashboard.service';
import { DashboardOverview } from 'src/interfaces/dashboard-overview';

@Controller('overview')
export class OverviewController {

  constructor(private dashboardService: DashboardService) { }

  @Get()
  findAll(): Promise<DashboardOverview> {
    return this.dashboardService.find();
  }

}
