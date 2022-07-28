import { UserClass } from './../../../../../classes/users/user';
import { CampaingClass } from './../../../../../classes/campaing/campaing';
import { Component, OnInit } from '@angular/core';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.page.html',
  styleUrls: ['./solicitations.page.scss'],
})
export class SolicitationsPage implements OnInit {
  public edit = false;

  constructor(
    public solicitation: Solicitation,
    private campaign: CampaingClass,
    private user: UserClass
  ) {}

  ngOnInit() {}

  accept(id) {
    for (const a of this.solicitation.get()) {
      if (a.id === id) {
        a.approve = true;
        this.solicitation.update(a).then(() => {
          let campaign = this.campaign.get();
          campaign.ticketsShare = a.ticketsFinal;
          this.campaign.update(campaign).then(() => {
            this.user.getHttp(a.userId).then((user) => {
              let updateUser = user;
              updateUser.ticketsInitial = a.ticketsInitial;
              updateUser.ticketsFinal = a.ticketsFinal;
              this.user.update(updateUser).then(() => {
                this.solicitation.delete(a.id).then(() => {
                  this.solicitation.setClass();
                });
              });
            });
          });
        });
      }
    }
  }

  reject(id) {
    this.solicitation.delete(id).then(() => {
      this.solicitation.setClass();
    });
  }

  editar() {
    this.edit = true;
  }

  save() {
    this.edit = false;
  }

  changeIni(event, id) {
    let value = event.detail.value;
    for (const a of this.solicitation.get()) {
      if (a.id === id) {
        a.ticketsInitial = Number(value);
        a.ticketsFinal = Number(value) + 99;
      }
    }
  }

  changeFinal(event, id) {
    let value = event.detail.value;
    for (const a of this.solicitation.get()) {
      if (a.id === id) {
        a.ticketsInitial = Number(value) - 99;
        a.ticketsFinal = Number(value);
      }
    }
  }

  setter(event, id) {}
}
