import { MyCustomHeader } from './../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MyCustomCampaingCard } from '../components/campaing/campaing-card/campaing-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MyCustomHeader,
    MyCustomCampaingCard,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
