import { MySkeletonBanner } from './../../../../components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignAdminDetailsPageRoutingModule } from './campaign-admin-details-routing.module';

import { CampaignAdminDetailsPage } from './campaign-admin-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignAdminDetailsPageRoutingModule,
    MyCustomHeader,
    MySkeletonBanner,
  ],
  declarations: [CampaignAdminDetailsPage],
})
export class CampaignAdminDetailsPageModule {}
