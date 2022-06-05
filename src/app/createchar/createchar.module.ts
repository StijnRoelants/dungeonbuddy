import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatecharPageRoutingModule } from './createchar-routing.module';

import { CreatecharPage } from './createchar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatecharPageRoutingModule
  ],
  declarations: [CreatecharPage]
})
export class CreatecharPageModule {}
