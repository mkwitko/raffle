import { Injectable } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Injectable({
  providedIn: 'root',
})
export class CreateImgService {
  constructor() {}

  generateImage() {
    var node: any = document.getElementById('image-section');
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
}
