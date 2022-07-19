import { SkeletonBannerComponent } from './skeleton-banner.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SkeletonBannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SkeletonBannerComponent
  ],
  providers: []
})

export class MySkeletonBanner {}
