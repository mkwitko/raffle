import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaingHomePageRoutingModule } from './campaing-home-routing.module';

import { CampaingHomePage } from './campaing-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaingHomePageRoutingModule
  ],
  declarations: [CampaingHomePage]
})
export class CampaingHomePageModule {}
