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
import { DatePipe } from '@angular/common';
import { PdfService } from '../pdf/pdf.service';

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
    private master: MasterService,
    private pdf: PdfService,
    private datePipe: DatePipe
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
  }

  setMultiple(raffle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.monitorClass.getAllHttp().then((res: any) => {
        this.monitorClass.getMyTickets(res);
        const monitorHttp = this.monitorClass.getUserRaffles();
        const rafflesHttp = monitorHttp.raffles;
        for (const a of raffle) {
          rafflesHttp[this.monitorClass.find(a.number).index] = a;
        }
        monitorHttp.raffles = rafflesHttp;
        resolve(monitorHttp);
      });
    });
  }

  sellMultiple(numbers, data, log = true) {
    let raffles = [];
    for (const a of numbers) {
      const newRaffle: Raffle = {
        number: a,
        buyer: data.name,
        contact: data.contact,
        seller: data.seller,
        purchasedWhen: new Date().getTime(),
        value: '25',
        reserved: false,
        sold: true,
        reserver: '',
        reservedTill: 0,
      };
      raffles.push(newRaffle);
    }
    this.setMultiple(raffles).then((obj) => {
      this.monitorClass.update(obj).then(() => {
        this.screen.presentToast(
          'Venda múltipla realizada com sucesso para ' + data.name,
          'Venda Confirmada!',
          'sucess'
        );
        this.master.update();
        this.screen.dismissModal();
        if (log) {
          for (const a of raffles) {
            this.log.add(a);
          }
        }
        this.downloadTerm(numbers, data);
      });
    });
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  datePip(dat) {
    return this.datePipe.transform(dat, 'dd-MM-yyyy');
  }

  async downloadTerm(numbers, data) {
    const content = [
      {
        image: await this.getBase64ImageFromURL(
          '../../../assets/img/acao.jpeg'
        ),
        width: 150,
        height: 100,
        alignment: 'center',
      },
      {
        text: [
          {
            text: 'Comprovante de Compra dos números\n ' + numbers,
            fontSize: 14,
            bold: true,
            color: 'black',
            alignment: 'center',
          },
          '\n\n Por meio deste fica registrada a compra de \n',
          { text: data.name, bold: true, color: 'black' },
          ' - ',
          {
            text: data.contact,
            fontSize: 10,
            bold: true,
            color: 'black',
          },
          ' - em \n',
          {
            text: this.datePip(new Date().getTime()),
            fontSize: 10,
            bold: true,
            color: 'black',
          },
          '. Verifique se as informações de\n cadastro estão corretas, sendo estas a forma\n como a organização tem de garantir que o\n vencedor receba seu prêmio.\n\n O sorteio será realizado e filmado, com testemunhas presentes, no dia 17/12/2022. \n\nConfira as regras desta ação ',
          {
            text: 'clicando aqui.',
            link: 'https://bit.ly/RegrasAcaoJDF',
            decoration: 'underline',
          },
        ],
        fontSize: 10,
        bold: false,
        alignment: 'center',
      },
      // {
      //   image: await this.getBase64ImageFromURL(
      //     '../../../assets/img/promo.jpeg'
      //   ),
      //   width: 250,
      //   alignment: 'center',
      // },
    ];
    const styles = {
      pageSize: 'A6',
    };
    this.pdf.createDocPDF(true, 'Comprovante', 'green', content, styles);
    this.screen.presentToast('Comprovante gerado com sucesso.', '', 'success');
  }

  sell(raffle, data, fromSell = true, log = true) {
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

  liberate(raffle, sell = true, log = true) {
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
