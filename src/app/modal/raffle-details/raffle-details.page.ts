import { CampaingClass } from './../../classes/campaing/campaing';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { Campaing } from './../../interfaces/campaing/campaing';
import { RaffleService } from 'src/app/services/raffle/raffle.service';
import { Component, Input, OnInit } from '@angular/core';
import { Raffle } from 'src/app/interfaces/raffle/raffle';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-raffle-details',
  templateUrl: './raffle-details.page.html',
  styleUrls: ['./raffle-details.page.scss'],
})
export class RaffleDetailsPage {
  @Input() who: Raffle;
  @Input() campaing: Campaing;

  constructor(
    private raffle: RaffleService,
    private alertController: AlertController,
    private screen: ScreenService,
    private campaingClass: CampaingClass
  ) {}

  sell(name, fromSell) {
    this.campaingClass.getCache().then((cache) => {
      this.raffle.sell(this.who, cache, name, fromSell);
    });
  }

  reserve(name, till) {
    this.campaingClass.getCache().then((cache) => {
      this.raffle.reserve(this.who, cache, name, till);
    });
  }

  liberate(sell) {
    this.campaingClass.getCache().then((cache) => {
      console.log(cache);
      this.raffle.liberate(this.who, cache, sell);
    });
  }

  async presentAlertLiberate(sell = true) {
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja liberar este número?',
      cssClass: 'my-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.liberate(sell);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertSell(fromSell = false) {
    const alert = await this.alertController.create({
      header: 'Por favor, preencha as informações',
      cssClass: 'my-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: (alertData) => {
            if (alertData.name) {
              this.sell(alertData.name, fromSell);
            } else {
              this.screen.presentToast('Preencha o campo de nome');
            }
          },
        },
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome',
        },
      ],
    });

    await alert.present();
  }

  async presentAlertReserve() {
    const alert = await this.alertController.create({
      header: 'Por favor, preencha as informações',
      cssClass: 'my-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: (alertData) => {
            if (alertData.name && alertData.date) {
              this.reserve(alertData.name, alertData.date);
            } else {
              this.screen.presentToast('Preencha o campo de nome e data');
            }
          },
        },
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome',
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Reservado até',
        },
      ],
    });

    await alert.present();
  }
}
