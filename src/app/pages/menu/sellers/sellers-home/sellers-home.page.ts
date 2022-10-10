import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CampaingClass } from 'src/app/classes/campaing/campaing';
import { MonitorClass } from 'src/app/classes/monitors/monitorClass';
import { UserClass } from 'src/app/classes/users/user';
import { RaffleService } from 'src/app/services/raffle/raffle.service';

@Component({
  selector: 'app-sellers-home',
  templateUrl: './sellers-home.page.html',
  styleUrls: ['./sellers-home.page.scss'],
})
export class SellersHomePage implements OnInit {
  public add = 1;
  public monitors = [];
  private id;
  constructor(
    public monitor: MonitorClass,
    private alertController: AlertController,
    private raffleService: RaffleService,
    private campaing: CampaingClass
  ) {
    this.monitor.getCache().then((cache) => {
      this.monitors = cache;
      this.id = this.monitors[0].id;
    });
  }

  ngOnInit() {}

  addNumbers() {
    this.presentAlert();
  }

  addToDb() {
    const monitorToAdd = this.monitor.findById(this.id);
    const camp = this.campaing.get();
    let count = 1;
    while (count <= this.add) {
      const raffle = this.raffleService.raffleMaker(
        camp.ticketsShare + count,
        25
      );
      monitorToAdd.raffles.push(raffle);
      count++;
    }
    this.monitor.update(monitorToAdd).then(() => {
      camp.free += this.add;
      camp.ticketsShare += this.add;
      this.campaing.update(camp);
    });
  }

  handleChange(event) {
    this.id = event.detail.value;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Tem certeza que deseja realizar esta ação?',
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
            this.addToDb();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
