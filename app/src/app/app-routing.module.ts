import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'hive',
    loadChildren: () => import('./hive/hive.module').then(m => m.HiveModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'queen',
    loadChildren: () => import('./queen/queen.module').then(m => m.QueenModule),
    canActivate: [AuthGuard],
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
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
