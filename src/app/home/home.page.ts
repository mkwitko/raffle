import { NavigationService } from './../services/navigation/navigation.service';
import { CampaingClass } from './../classes/campaing/campaing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public campaingClass: CampaingClass,
    private navigation: NavigationService
  ) {}

  goTo(id) {
    this.navigation.rotaId('campaign-admin-details', id);
  }
}
