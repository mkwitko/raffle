import { ShareService } from './../share/share.service';
import { GroupClass } from './../../classes/group/group';
import { MasterService } from './../master/master.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from './../screen/screen.service';
import { CampaingClass } from './../../classes/campaing/campaing';
import { Raffle } from './../../interfaces/raffle/raffle';
import { Campaing } from './../../interfaces/campaing/campaing';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  constructor(
    private campaignClass: CampaingClass,
    private screen: ScreenService,
    private share: ShareService
  ) {}

  sell(raffle, campaing, data, fromSell) {
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
    let raffles = campaing.raffles;
    raffles[this.findRaffleIndex(raffle, campaing)] = newRaffle;
    campaing.raffles = raffles;
    campaing.sold++;
    if (fromSell) {
      campaing.reserved--;
    } else {
      campaing.free--;
    }
    this.campaignClass.update(campaing).then(() => {
      this.screen.presentToast(
        'Número vendido com sucesso para ' + name,
        'Venda Confirmada!',
        'sucess'
      );
      this.campaignClass.setClass(true).then(() => {
        this.campaignClass.getMyTickets(campaing);
        this.campaignClass.createPagination(campaing);
        this.screen.dismissModal();
      });
    });
  }

  reserve(raffle, campaing, name, till) {
    const newRaffle: Raffle = {
      number: raffle.number,
      buyer: '',
      purchasedWhen: 0,
      value: raffle.value,
      reserved: true,
      sold: false,
      reserver: name,
      reservedTill: till,
    };
    let raffles = campaing.raffles;
    raffles[this.findRaffleIndex(raffle, campaing)] = newRaffle;
    campaing.raffles = raffles;
    campaing.reserved++;
    campaing.free--;
    console.log(campaing);
    this.campaignClass.update(campaing).then(() => {
      this.screen.presentToast(
        'Número reservado com sucesso para ' + name + ' até o dia ' + till,
        'Reserva Confirmada!',
        'sucess'
      );
      this.campaignClass.setClass(true).then(() => {
        this.campaignClass.getMyTickets(campaing);
        this.campaignClass.createPagination(campaing);
        this.screen.dismissModal();
      });
    });
  }

  liberate(raffle, campaing, sell = true) {
    const newRaffle: Raffle = {
      number: raffle.number,
      buyer: '',
      purchasedWhen: 0,
      value: raffle.value,
      reserved: false,
      sold: false,
      reserver: '',
      reservedTill: 0,
    };
    let raffles = campaing.raffles;
    raffles[this.findRaffleIndex(raffle, campaing)] = newRaffle;
    campaing.raffles = raffles;
    campaing.free++;
    if (sell) {
      campaing.sold--;
    } else {
      campaing.reserved--;
    }
    this.campaignClass.update(campaing).then(() => {
      this.screen.presentToast(
        'Número liberado com sucesso!',
        'Liberação confirmada!',
        'sucess'
      );
      this.campaignClass.setClass(true).then((res) => {
        this.campaignClass.set(res);
        this.campaignClass.getMyTickets(res);
        this.campaignClass.createPagination(res);
        this.screen.dismissModal();
      });
    });
  }

  findRaffleIndex(raffle, campaing) {
    console.log('find index - ', campaing);
    let count = 0;
    for (const a of campaing.raffles) {
      if (a.number === raffle.number) {
        return count;
      }
      count++;
    }
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
