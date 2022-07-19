import { Injectable } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private socialSharing: SocialSharing,
    private platform: Platform
  ) {}

  share(message, subject) {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(message, subject);
    } else {
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
