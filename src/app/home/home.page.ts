import { environment } from './../../environments/environment';
import { NavigationService } from './../services/navigation/navigation.service';
import { CampaingClass } from './../classes/campaing/campaing';
import { Component } from '@angular/core';
import { MasterService } from '../services/master/master.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public version = environment.global.version;
  constructor(
    public campaingClass: CampaingClass,
    private navigation: NavigationService,
    private master: MasterService
  ) {}

  goTo(id) {
    this.navigation.rotaId('campaign-admin-details', id);
  }

  update() {
    this.master.update();
  }
}
