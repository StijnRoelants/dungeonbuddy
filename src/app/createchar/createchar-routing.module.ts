import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatecharPage } from './createchar.page';

const routes: Routes = [
  {
    path: '',
    component: CreatecharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatecharPageRoutingModule {}
