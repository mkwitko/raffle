import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { CampaingClass } from './../../../../classes/campaing/campaing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-campaing',
  templateUrl: './my-campaing.page.html',
  styleUrls: ['./my-campaing.page.scss'],
})
export class MyCampaingPage {
  constructor(
    public campaingClass: CampaingClass,
    private navigation: NavigationService
  ) {}

  goTo(id) {
    this.navigation.rotaId('campaign-admin-details', id);
  }
}
