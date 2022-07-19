import { TabComponent } from './tab.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TabComponent
  ],
  providers: []
})

export class MyCustomTab {}
