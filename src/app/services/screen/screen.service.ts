import { Injectable } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(
    public modalController: ModalController,
    private toastr: ToastrService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  public async presentToast(message: string, title?: string, type = 'error') {
    if (type === 'sucess') {
      this.toastr.success(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'error') {
      this.toastr.error(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'warning') {
      this.toastr.warning(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'info') {
      this.toastr.info(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentModal(myPage, myClass: string, who?, campaing?) {
    const modal = await this.modalController.create({
      component: myPage,
      cssClass: myClass,
      backdropDismiss: true,
      canDismiss: true,
      componentProps: {
        who: who,
        campaing: campaing,
      },
    });
    return await modal.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async presentLoading(text = 'Aguarde...') {
    const loading = await this.loadingController.create({
      message: text,
    });
    await loading.present();
  }

  async dismissloading() {
    this.loadingController.dismiss();
  }
}
