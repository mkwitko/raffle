import { UserClass } from 'src/app/classes/users/user';
import { promise } from 'protractor';
import { Campaing } from './../../interfaces/campaing/campaing';
import { CacheService } from '../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from '../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { resourceLimits } from 'worker_threads';
import { Raffle } from 'src/app/interfaces/raffle/raffle';

@Injectable()
export class CampaingClass {
  private campaingInfo: Campaing;
  private campaingPagination;
  private campaingUser;

  private adminActiveCampaigns;
  private adminInactiveCampaigns;

  private cachePath = environment.global.path.campaings;
  private cacheAdminActivePath = environment.global.path.adminActiveCampaigns;
  private cacheAdminInactivePath =
    environment.global.path.adminInactiveCampaigns;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.campaings;
  private interfaceRef: Campaing;

  constructor(
    public user: UserClass,
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  recover() {
    let result = [];
    result.push(
      this.create(
        301,
        'Fabio Andolphi',
        '+55 22 99739-9279',
        'Mauricio de Oliveira Kwitko',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        305,
        'Edson de Toledo',
        '+55 51 99221-0594',
        'Mauricio de Oliveira Kwitko',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        351,
        'Davi Ponsoni',
        '+55 51 99896-6093',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        353,
        'Vânia Melchionna',
        '+55 51 98114-6662',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        354,
        'Debora Hennicka',
        '+55 51 99952-9868',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        355,
        'Maria Eugenia',
        '+55 51 98901-8181',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        357,
        'Debora Hennicka',
        '+55 51 99952-9868',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        359,
        'Vânia Melchionna',
        '+55 51 98114-6662',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        360,
        'Max da Silva Hennicka',
        '+55 51 99967-6723',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        385,
        'Maria Eugenia',
        '+55 51 98901-8181',
        'Mara Eliana de Oliveira',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        607,
        'Eliete Angelica',
        '+55 51 98041-5536',
        'Camila',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1111,
        'Alexa Lacerda',
        '+55 51 99986-8030',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1112,
        'Alexa Lacerda',
        '+55 51 99986-8030',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1113,
        'Alexa Lacerda',
        '+55 51 99986-8030',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1114,
        'Fabiane F. Bittencourt',
        '+55 51 99966-3152',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1115,
        'Alexa Lacerda',
        '+55 51 99986-8030',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1116,
        'Matheus Schiffner',
        '+55 51 98951-4899',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1117,
        'Matheus Schiffner',
        '+55 51 98951-4899',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1118,
        'Matheus Schiffner',
        '+55 51 98951-4899',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1119,
        'Matheus Schiffner',
        '+55 51 98951-4899',
        'Naad',
        this.convertTime('18', '08', '2022')
      )
    );

    result.push(
      this.create(
        1120,
        'Maria Teresa',
        '+55 51 99382-2220',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1151,
        'Gislaine Bizo',
        '+55 51 99935-0163',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1152,
        'Fabiano Pagane',
        '+55 51 99973-1253',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1154,
        'Ilza Brum Ribas',
        '+55 51 99615-1471',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1155,
        'Shirlize Fietz',
        '+55 51 99143-3316',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );

    result.push(
      this.create(
        1158,
        'Maria Teresa Schiffner',
        '+55 51 99382-220',
        'Naad Santana',
        this.convertTime('19', '08', '2022')
      )
    );
    return result;
  }

  convertTime(day, month, year) {
    return new Date(year, month, day).getTime();
  }

  create(number, name, contact, seller, when, value = '25') {
    const newRaffle: Raffle = {
      number: number,
      buyer: name,
      contact: contact,
      seller: seller,
      purchasedWhen: when,
      value: value,
      reserved: false,
      sold: true,
      reserver: '',
      reservedTill: 0,
    };
    return newRaffle;
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

  getCache(cachePath = this.cachePath): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.campaingInfo;
  }

  getAdminCampaings(active = true) {
    if (active) {
      return this.adminActiveCampaigns;
    } else {
      return this.adminInactiveCampaigns;
    }
  }

  getCollection() {
    return this.collection;
  }

  getRef() {
    return this.ref;
  }

  setCache(cachePath, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    this.campaingInfo = value;
  }

  setAdminCampaigns(value, active = true) {
    if (active) {
      this.adminActiveCampaigns = value;
    } else {
      this.adminInactiveCampaigns = value;
    }
  }

  reset() {
    this.campaingInfo = null;
  }

  getMyCampaing(id, active = true) {
    let willReturn = [];
    if (this.get().groupId === id) {
      if (this.get().active === active) {
        willReturn.push(this.get());
      }
    }
    return willReturn;
  }

  getCampaignById(id): Promise<any> {
    return new Promise((resolve) => {
      if (this.get()) {
        if (this.get().id === id) {
          resolve(this.get());
        }
      } else {
        this.getCache(this.cacheAdminActivePath).then((cache) => {
          for (const a of cache) {
            if (a.id === id) {
              resolve(a);
            }
          }
        });
      }
    });
  }

  getCampaingPagination() {
    return this.campaingPagination;
  }

  getCampaignUser() {
    return this.campaingUser;
  }

  getMyTickets(campaign) {
    const result = [];
    for (const a of campaign.raffles) {
      if (
        a.number >= this.user.get().ticketsInitial &&
        a.number <= this.user.get().ticketsFinal
      ) {
        result.push(a);
      }
    }
    this.campaingUser = result;
    return result;
  }

  createPagination(campaign, limit = 100) {
    let result = [];
    let resultTemp = [];
    let limitCount = 0;
    let pageCount = 0;
    for (const a of campaign.raffles) {
      if (limitCount === limit) {
        result.push({
          page: pageCount,
          data: resultTemp,
        });
        resultTemp = [];
        limitCount = 0;
        pageCount++;
      } else if (a.number === campaign.raffles.length) {
        result.push({
          page: pageCount,
          data: resultTemp,
        });
      }
      resultTemp.push(a);
      limitCount++;
    }
    this.campaingPagination = result;
    return result;
  }

  setAdminClass(groupId, active = true): Promise<any> {
    return new Promise((resolve) => {
      const res = this.getMyCampaing(groupId, active);
      this.setCache(
        active ? this.cacheAdminActivePath : this.cacheAdminInactivePath,
        res
      );
      this.setAdminCampaigns(res, active);
      resolve(res[0]);
    });
  }

  setClass(shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http[0]);
              this.setCache(this.cachePath, http[0]);
              this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', true).then((res) => {
                this.createPagination(res);
                this.getMyTickets(res);
              });
              this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', false);
              resolve(http[0]);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          resolve(cache);
        }
      });
    });
  }

  add(object: Campaing) {
    this.crud.add(this.collection, object);
  }

  async update(object: Campaing): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, object, object.id)
        .then((res) => {
          this.screen.dismissloading();
          resolve(res);
        })
        .catch((err) => {
          this.screen.dismissloading();
          reject(err);
        });
    });
  }
}
