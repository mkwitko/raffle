import { Injectable } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  constructor() { }

  goTo(slides: IonSlides, index)
  {
    slides.slideTo(index);
  }
}
