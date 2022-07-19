import { MyCustomHeader } from '../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCampaingPageRoutingModule } from './my-campaing-routing.module';

import { MyCampaingPage } from './my-campaing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCampaingPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [MyCampaingPage],
})
export class MyCampaingPageModule {}
