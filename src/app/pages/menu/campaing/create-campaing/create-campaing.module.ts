import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampaingPageRoutingModule } from './create-campaing-routing.module';

import { CreateCampaingPage } from './create-campaing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCampaingPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [CreateCampaingPage],
})
export class CreateCampaingPageModule {}
