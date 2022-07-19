import { SafeUrlService } from './../sanitize/safe-url.service';
// import {
//   InAppBrowser,
//   InAppBrowserObject,
// } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private router: Router,
    // private inApp: InAppBrowser,
    private safe: SafeUrlService
  ) {}

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // away(url: string) {
  //   const browser = this.inApp.create(url, '_blank');
  //   browser.show();
  // }

  down(url: string) {
    window.open(url);
  }

  rotaId(rota: string, id: string) {
    const navExtra: NavigationExtras = {
      queryParams: {
        id,
      },
    };
    this.router.navigate(['/' + rota], navExtra);
  }
}
