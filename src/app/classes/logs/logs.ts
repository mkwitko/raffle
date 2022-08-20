import { UserClass } from '../users/user';
import { Campaing } from '../../interfaces/campaing/campaing';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Group } from 'src/app/interfaces/groups/group';
import { CacheService } from 'src/app/services/cache/cache.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';
import { Raffle } from 'src/app/interfaces/raffle/raffle';

@Injectable()
export class Logs {
  private info;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.logs;
  private interfaceRef: Raffle;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp() {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getHttp(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.crud.get(this.collection, this.interfaceRef, id).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  get() {
    return this.info;
  }

  getCollection() {
    return this.collection;
  }

  getRef() {
    return this.ref;
  }

  set(value) {
    this.info = value;
  }

  reset() {
    this.info = null;
  }

  add(object: Raffle) {
    console.log(object);
    this.crud.add(this.collection, this.createlogs(object));
  }

  createlogs(raffle: Raffle) {
    const logs: Raffle = {
      number: raffle.number,
      buyer: raffle.buyer,
      contact: raffle.contact,
      seller: raffle.seller,
      purchasedWhen: raffle.purchasedWhen,
      value: raffle.value,
      sold: raffle.sold,
      log: new Date().getTime(),
    };
    return logs;
  }
}
