import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaffleMultiplePageRoutingModule } from './raffle-multiple-routing.module';

import { RaffleMultiplePage } from './raffle-multiple.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaffleMultiplePageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [RaffleMultiplePage],
})
export class RaffleMultiplePageModule {}
