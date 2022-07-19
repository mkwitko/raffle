import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyParticipationsPageRoutingModule } from './my-participations-routing.module';

import { MyParticipationsPage } from './my-participations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyParticipationsPageRoutingModule
  ],
  declarations: [MyParticipationsPage]
})
export class MyParticipationsPageModule {}
