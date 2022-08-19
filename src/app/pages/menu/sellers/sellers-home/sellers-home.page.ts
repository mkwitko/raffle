import { Component, OnInit } from '@angular/core';
import { CampaingClass } from 'src/app/classes/campaing/campaing';
import { UserClass } from 'src/app/classes/users/user';

@Component({
  selector: 'app-sellers-home',
  templateUrl: './sellers-home.page.html',
  styleUrls: ['./sellers-home.page.scss'],
})
export class SellersHomePage implements OnInit {
  constructor(private campaign: CampaingClass) {}

  ngOnInit() {}

  send(index) {
    const user = this.campaign.user.get();
    this.basic(user.ticketsInitial, index);
  }

  basic(ini, index) {
    const initial = ini + 10 * index;
    const final = ini + 10 * index + 9;

    console.log(this.campaign.get());
  }
}
