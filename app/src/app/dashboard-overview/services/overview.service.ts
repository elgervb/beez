import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardOverview } from '@common/dashboard-overview';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) { }

  find() {
    return this.http.get<DashboardOverview>(`${apiUrl}/overview`);
  }
}
