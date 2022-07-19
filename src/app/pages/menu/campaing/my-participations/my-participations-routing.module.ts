import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyParticipationsPage } from './my-participations.page';

const routes: Routes = [
  {
    path: '',
    component: MyParticipationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyParticipationsPageRoutingModule {}
