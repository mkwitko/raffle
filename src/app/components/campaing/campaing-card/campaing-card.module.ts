import { CampaingCardComponent } from './campaing-card.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CampaingCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [CampaingCardComponent],
  providers: [],
})
export class MyCustomCampaingCard {}
