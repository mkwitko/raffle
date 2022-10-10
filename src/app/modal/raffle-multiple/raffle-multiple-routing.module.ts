import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaffleMultiplePage } from './raffle-multiple.page';

const routes: Routes = [
  {
    path: '',
    component: RaffleMultiplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaffleMultiplePageRoutingModule {}
