import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitationsPage } from './solicitations.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitationsPageRoutingModule {}
