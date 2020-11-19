import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'dashboard', icon: 'dashboard' },
    children: [
      {
        path: 'location',
        loadChildren: () => import('../location/location.module').then(m => m.LocationModule),
        data: { title: 'location', icon: 'location-marker' }
      },
      {
        path: 'hive',
        loadChildren: () => import('../hive/hive.module').then(m => m.HiveModule),
        data: { title: 'hive', icon: 'hive' }
      },
      {
        path: 'queen',
        loadChildren: () => import('../queen/queen.module').then(m => m.QueenModule),
        data: { title: 'queen', icon: 'bee' }
      },
      {
        path: 'inspection',
        loadChildren: () => import('../inspection/inspection.module').then(m => m.InspectionModule),
        data: { title: 'inspection', icon: 'inspection' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
