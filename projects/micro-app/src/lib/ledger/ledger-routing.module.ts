import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegderComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: LegderComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LedgerRoutingModule { }
