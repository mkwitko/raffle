import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignAdminDetailsPage } from './campaign-admin-details.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignAdminDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignAdminDetailsPageRoutingModule {}
