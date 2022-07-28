import { ShareService } from './../../services/share/share.service';
import { CampaingClass } from './../../classes/campaing/campaing';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { Campaing } from './../../interfaces/campaing/campaing';
import { RaffleService } from 'src/app/services/raffle/raffle.service';
import { Component, Input, OnInit } from '@angular/core';
import { Raffle } from 'src/app/interfaces/raffle/raffle';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import * as htmlToImage from 'html-to-image';
import { PdfService } from 'src/app/services/pdf/pdf.service';

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
    private campaingClass: CampaingClass,
    private share: ShareService,
    private pdf: PdfService,
    private datePipe: DatePipe
  ) {}

  sharing() {
    // this.downloadTerm();
    navigator.share({ title: 'Example Page', url: 'https://example.com' });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  datePip(dat) {
    return this.datePipe.transform(dat, 'dd-MM-yyyy');
  }

  generateImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      var node: any = document.getElementById('recibo');
      htmlToImage
        .toPng(node)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          resolve(dataUrl);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  sell(data, fromSell) {
    this.campaingClass.getCache().then((cache) => {
      this.raffle.sell(this.who, cache, data, fromSell);
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
            if (alertData.name && alertData.contact && alertData.seller) {
              this.sell(alertData, fromSell);
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
        },
        {
          name: 'contact',
          placeholder: 'Contato',
        },
        {
          name: 'seller',
          placeholder: 'Vendedor',
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

  async downloadTerm() {
    const content = [
      {
        text: '\n\n\nComprovante de Compra de Rifa',
        style: 'header',
        alignment: 'center',
        bold: true,
      },
      {
        text: [
          '\n\n\n\n\n\n Por meio deste fica comprovado a compra do número, ',
          // eslint-disable-next-line max-len
          {
            text: this.who.number,
            bold: true,
            color: 'black',
          },
          ', pelo sr ou sra ',
          { text: this.who.buyer, bold: true, color: 'black' },
          ', e vendido por ',
          {
            text: this.who.seller,
            bold: true,
            color: 'black',
          },
          ' na data de ',
          {
            text: this.datePip(this.who.purchasedWhen),
            bold: true,
            color: 'black',
          },
          ', tendo sido o contato do comprador registrado como ',
          {
            text: this.who.contact,
            bold: true,
            color: 'black',
          },
          '. \n\n\nSolicitamos que seja revisado pelo comprador e vendedor se as informações deste comprovante estão corretas, sendo estas a forma como a organização tem de garantir que o vencedor da rifa receba seu prêmio.',
        ],
        style: 'content',
        bold: false,
        alignment: 'justify',
      },
    ];
    const styles = {
      header: {
        fontSize: 14,
      },
      content: {
        fontSize: 10,
      },
    };
    this.pdf.createDocPDF(
      true,
      'Comprovante Rifa JDF',
      'green',
      content,
      styles
    );
    this.screen.presentToast('Comprovante gerado com sucesso.', '', 'success');
  }
}
