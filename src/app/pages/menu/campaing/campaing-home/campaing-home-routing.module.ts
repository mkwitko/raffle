import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaingHomePage } from './campaing-home.page';

const routes: Routes = [
  {
    path: '',
    component: CampaingHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaingHomePageRoutingModule {}
