import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'hive',
    loadChildren: () => import('./hive/hive.module').then(m => m.HiveModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'queen',
    loadChildren: () => import('./queen/queen.module').then(m => m.QueenModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
