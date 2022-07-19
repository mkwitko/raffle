import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SafeUrlService {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  sanitize(url: string)
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
