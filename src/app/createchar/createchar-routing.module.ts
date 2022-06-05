import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CreatecharPageRoutingModule {}
