import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueenComponent } from './containers/queen/queen.component';

const routes: Routes = [{ path: '', component: QueenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
