import { RaffleMultiplePage } from './../../../../modal/raffle-multiple/raffle-multiple.page';
import { MonitorClass } from 'src/app/classes/monitors/monitorClass';
import { UserClass } from 'src/app/classes/users/user';
import { RaffleDetailsPage } from './../../../../modal/raffle-details/raffle-details.page';
import { ScreenService } from './../../../../services/screen/screen.service';
import { CampaingClass } from './../../../../classes/campaing/campaing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaffleService } from 'src/app/services/raffle/raffle.service';

@Component({
  selector: 'app-campaign-admin-details',
  templateUrl: './campaign-admin-details.page.html',
  styleUrls: ['./campaign-admin-details.page.scss'],
})
export class CampaignAdminDetailsPage {
  public id;
  public campaign;
  public campaignPagination;
  public campaignUser;
  constructor(
    public userClass: UserClass,
    public campaignClass: CampaingClass,
    public monitorClass: MonitorClass,
    private raffle: RaffleService,
    private screen: ScreenService
  ) {}

  createRaffle() {
    this.raffle.createRaffle(this.campaign);
  }

  details(raffle) {
    this.screen.presentModal(
      RaffleDetailsPage,
      'transparent-modal',
      raffle,
      this.campaignClass.get()
    );
  }

  goTo() {
    this.screen.presentModal(
      RaffleMultiplePage,
      'transparent-modal',
      this.campaignClass.get()
    );
  }
}
