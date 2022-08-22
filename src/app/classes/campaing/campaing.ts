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
import { Raffle } from 'src/app/interfaces/raffle/raffle';
import { RaffleClass } from '../raffles/raffle';

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
    private cache: CacheService,
    private raffleClass: RaffleClass
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

  getUserIndex() {
    return (this.user.get().ticketsInitial - 1) / 100;
  }

  createPagination(campaign, limit = 100) {
    let result = [];
    let resultTemp = [];
    let limitCount = 0;
    let pageCount = 0;
    for (const a of this.raffleClass.get()) {
      if (limitCount === limit) {
        result.push({
          page: pageCount,
          data: resultTemp,
        });
        resultTemp = [];
        limitCount = 0;
        pageCount++;
      } else if (a.number === this.raffleClass.get().length) {
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

  setClass(shouldUpdate, sold): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http[0]);
              if (http[0].sold !== sold.length) {
                const camp = http[0];
                camp.sold = sold.length;
                camp.free = 1200 - sold.length;
                this.update(camp).then(() => {
                  this.set(camp);
                  this.setCache(this.cachePath, camp);
                });
              }
              this.setCache(this.cachePath, http[0]);
              this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', true).then((res) => {
                // this.createPagination(res);
                // this.getMyTickets(res);
              });
              // this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', false);
              resolve(http[0]);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          // this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', true).then((res) => {
          //   this.createPagination(res);
          //   this.getMyTickets(res);
          // });
          // this.setAdminClass(' ZGn06nBznLMoMeV3Eh1u', false);
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
