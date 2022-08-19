import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellersHomePageRoutingModule } from './sellers-home-routing.module';

import { SellersHomePage } from './sellers-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellersHomePageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [SellersHomePage],
})
export class SellersHomePageModule {}
