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
    this.downloadTerm();
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
          value: this.who.buyer,
        },
        {
          name: 'contact',
          placeholder: 'Whatsapp',
          value: this.who.contact,
        },
        {
          name: 'seller',
          placeholder: 'Sócio Vendedor',
          value: this.who.seller,
        },
      ],
    });

    await alert.present();
  }

  edit() {}

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
        image: await this.getBase64ImageFromURL(
          '../../../assets/img/acao.jpeg'
        ),
        width: 150,
        height: 100,
        alignment: 'center',
      },
      // {
      //   text: 'Centro Espírita Beneficiente União do Vegetal\nNúcleo Jardim das Flores - 9ª região',
      //   fontSize: 10,
      //   alignment: 'center',
      //   bold: false,
      // },
      {
        text: [
          {
            text: 'Comprovante de Compra\n Nº ' + this.who.number,
            fontSize: 14,
            bold: true,
            color: 'black',
            alignment: 'center',
          },
          '\n\n Por meio deste fica registrada a compra de \n',
          { text: this.who.buyer, bold: true, color: 'black' },
          ' - ',
          {
            text: this.who.contact,
            fontSize: 10,
            bold: true,
            color: 'black',
          },
          ' - em \n',
          {
            text: this.datePip(this.who.purchasedWhen),
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
}
