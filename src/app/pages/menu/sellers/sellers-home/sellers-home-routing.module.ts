import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersHomePage } from './sellers-home.page';

const routes: Routes = [
  {
    path: '',
    component: SellersHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersHomePageRoutingModule {}
