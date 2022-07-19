import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitationsPageRoutingModule } from './solicitations-routing.module';

import { SolicitationsPage } from './solicitations.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitationsPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [SolicitationsPage],
})
export class SolicitationsPageModule {}
