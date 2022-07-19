import { MyCustomHeader } from './../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaffleDetailsPageRoutingModule } from './raffle-details-routing.module';

import { RaffleDetailsPage } from './raffle-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaffleDetailsPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [RaffleDetailsPage],
})
export class RaffleDetailsPageModule {}
