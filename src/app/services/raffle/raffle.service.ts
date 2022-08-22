import { MasterService } from './../master/master.service';
import { ShareService } from './../share/share.service';
import { ScreenService } from './../screen/screen.service';
import { CampaingClass } from './../../classes/campaing/campaing';
import { Raffle } from './../../interfaces/raffle/raffle';
import { Campaing } from './../../interfaces/campaing/campaing';
import { Injectable } from '@angular/core';
import { Logs } from 'src/app/classes/logs/logs';
import { RaffleClass } from 'src/app/classes/raffles/raffle';
import { MonitorClass } from 'src/app/classes/monitors/monitorClass';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  constructor(
    private campaignClass: CampaingClass,
    private screen: ScreenService,
    private raffleClass: RaffleClass,
    private log: Logs,
    private monitorClass: MonitorClass,
    private master: MasterService
  ) {}

  getRaffleId(number) {
    return this.raffleClass.find(number).id;
  }

  set(raffle, newRaffle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.monitorClass
        .getAllHttp()
        .then((res: any) => {
          const obj = res;
          this.monitorClass.getMyTickets(obj);
          const monitorHttp = this.monitorClass.getUserRaffles();
          const rafflesHttp = monitorHttp.raffles;
          rafflesHttp[this.monitorClass.find(raffle.number).index] = newRaffle;
          monitorHttp.raffles = rafflesHttp;
          resolve(monitorHttp);
        })
        .catch((err) => {
          reject(err);
        });
    });
    // const monitor = this.monitorClass.getUserRaffles();
    // const raffles = monitor.raffles;
    // raffles[this.monitorClass.find(raffle.number).index] = newRaffle;
    // monitor.raffles = raffles;
    // return monitor;
  }

  sell(raffle, data, fromSell = true, log = false) {
    const newRaffle: Raffle = {
      number: raffle.number,
      buyer: data.name,
      contact: data.contact,
      seller: data.seller,
      purchasedWhen: new Date().getTime(),
      value: raffle.value,
      reserved: false,
      sold: true,
      reserver: '',
      reservedTill: 0,
    };
    this.set(raffle, newRaffle).then((obj) => {
      this.monitorClass.update(obj).then(() => {
        this.screen.presentToast(
          'Número vendido com sucesso para ' + data.name,
          'Venda Confirmada!',
          'sucess'
        );
        this.updateCampaign(newRaffle, log);
      });
    });
  }

  updateCampaign(newRaffle, log) {
    this.master.update();
    this.screen.dismissModal();
    if (log) {
      this.log.add(newRaffle);
    }
  }

  liberate(raffle, sell = true, log = false) {
    const newRaffle: Raffle = {
      number: raffle.number,
      buyer: '',
      contact: '',
      seller: '',
      purchasedWhen: 0,
      value: raffle.value,
      reserved: false,
      sold: false,
      reserver: '',
      reservedTill: 0,
    };
    this.set(raffle, newRaffle).then((obj) => {
      this.monitorClass.update(obj).then(() => {
        this.screen.presentToast(
          'Número liberado com sucesso!',
          'Liberação confirmada!',
          'sucess'
        );
        this.updateCampaign(newRaffle, log);
      });
    });
  }

  createRaffle(campaign: Campaing) {
    let count = 1;
    let value = campaign.value / campaign.tickets;
    let raffles = new Array<Raffle>();
    raffles = [];
    while (count <= campaign.tickets) {
      raffles.push(this.raffleMaker(count, value));
      count++;
    }
    campaign.raffles = raffles;
    this.campaignClass.update(campaign).then((res) => {
      this.screen.presentToast(
        'Rifas criadas com sucesso!',
        'Sucesso!',
        'sucess'
      );
    });
  }

  raffleMaker(count, value) {
    let raffle: Raffle = {
      number: count,
      buyer: '',
      value: value,
      reserved: false,
      sold: false,
      reserver: '',
    };
    return raffle;
  }
}
