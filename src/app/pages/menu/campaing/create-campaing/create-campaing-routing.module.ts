import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCampaingPage } from './create-campaing.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCampaingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCampaingPageRoutingModule {}
