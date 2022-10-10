import { ScreenService } from './../screen/screen.service';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private socialSharing: SocialSharing,
    private platform: Platform,
    private screen: ScreenService
  ) {}

  share(file) {
    if (this.platform.is('cordova')) {
      this.screen.presentToast('mobile');
      this.socialSharing.share('', '', file);
    } else {
      this.screen.presentToast('web');
      // navigator
      //   .share({
      //     title: subject,
      //     text: message,
      //   })
      //   .then(function () {
      //     console.log('Successful share');
      //   })
      //   .catch(function (error) {
      //     console.log('Error sharing:', error);
      //   });
    }
  }
}
