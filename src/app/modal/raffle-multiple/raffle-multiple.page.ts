import { RaffleService } from 'src/app/services/raffle/raffle.service';
import { MonitorClass } from 'src/app/classes/monitors/monitorClass';
import { ScreenService } from './../../services/screen/screen.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raffle-multiple',
  templateUrl: './raffle-multiple.page.html',
  styleUrls: ['./raffle-multiple.page.scss'],
})
export class RaffleMultiplePage implements OnInit {
  public pick = [];
  constructor(
    public monitor: MonitorClass,
    private alertController: AlertController,
    private screen: ScreenService,
    private raffle: RaffleService
  ) {}

  ngOnInit() {}

  handleChange(event) {
    this.pick = event.detail.value;
  }

  sell(data) {
    if (this.pick.length > 1 && data) {
      this.raffle.sellMultiple(this.pick, data);
    } else {
      this.screen.presentToast('Selecione dois ou mais números');
    }
  }

  async presentAlertConfirm(data) {
    const alert = await this.alertController.create({
      header: 'Confira os números inseridos',
      message:
        'Você tem certeza que deseja realizar esta venda? Essa ação só poderá ser revertida liberando número por número de maneira individual.',
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
            if (data) {
              this.sell(data);
            } else {
              this.screen.presentToast('Preencha todos os campos.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertSell(fromSell = false) {
    if (this.pick.length > 1) {
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
              if (alertData.name && alertData.contact && alertData.seller) {
                this.presentAlertConfirm(alertData);
              } else {
                this.screen.presentToast('Preencha todos os campos.');
              }
            },
          },
        ],
        inputs: [
          {
            name: 'name',
            placeholder: 'Comprador',
            // value: this.who.buyer,
          },
          {
            name: 'contact',
            placeholder: 'Whatsapp',
            // value: this.who.contact,
          },
          {
            name: 'seller',
            placeholder: 'Sócio Vendedor',
            // value: this.who.seller,
          },
        ],
      });

      await alert.present();
    } else {
      this.screen.presentToast('Selecione dois ou mais números');
    }
  }
}
