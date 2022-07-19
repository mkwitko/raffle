import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCampaingPage } from './my-campaing.page';

const routes: Routes = [
  {
    path: '',
    component: MyCampaingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCampaingPageRoutingModule {}
