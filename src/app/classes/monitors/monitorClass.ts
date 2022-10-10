import { Raffle } from 'src/app/interfaces/raffle/raffle';
import { UserClass } from 'src/app/classes/users/user';
import { promise } from 'protractor';
import { Monitor } from '../../interfaces/Monitors/Monitor';
import { CacheService } from '../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from '../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { CampaingClass } from '../campaing/campaing';
import { timeStamp } from 'console';
import { Logs } from '../logs/logs';

@Injectable()
export class MonitorClass {
  private MonitorInfo = new Array<Monitor>();
  private userRaffles;
  private finder = [];
  private finderById = [];

  private cachePath = environment.global.path.monitor;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.monitor;
  private interfaceRef: Monitor;

  constructor(
    public user: UserClass,
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private campaign: CampaingClass,
    private logs: Logs
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getUserIndex() {
    return (this.user.get().ticketsInitial - 1) / 100;
  }

  getMyTickets(obj) {
    console.log('a');
    if (this.user.get().role !== 'admin') {
      for (const a of obj) {
        if (a.number - 1 === this.getUserIndex()) {
          this.userRaffles = a;
        }
      }
    } else {
      obj.sort((a, b) => (a.number < b.number ? -1 : 1));
      this.userRaffles = [];
      for (const a of obj) {
        this.userRaffles.push(a);
      }
      console.log(this.userRaffles);
    }
  }

  fill(admin = false) {
    let count = 0;
    if (this.getUserRaffles().length > 1) {
      for (const each of this.getUserRaffles()) {
        for (const each_raffle of each.raffles) {
          this.finder[each_raffle.number] = each_raffle;
          this.finder[each_raffle.number].index = count;
          count++;
        }
      }
    } else {
      for (const a of this.getUserRaffles().raffles) {
        this.finder[a.number] = a;
        this.finder[a.number].index = count;
        count++;
      }
    }
  }

  find(number) {
    return this.finder[number];
  }

  getUserRaffles() {
    return this.userRaffles;
  }

  getFreeUserRaffles() {
    let free = [];
    for (const a of this.userRaffles.raffles) {
      if (!a.sold) {
        free.push(a);
      }
    }
    return free;
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
    return this.MonitorInfo;
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
    this.MonitorInfo = value;
    this.getMyTickets(value);
    this.fill();
  }

  reset() {
    this.MonitorInfo = null;
  }

  findSoldNumber(obj) {
    let sold = [];
    for (const a of obj) {
      for (const b of a.raffles) {
        if (b.sold) {
          sold.push(b);
        }
      }
    }
    return sold;
  }

  fillMonitorsById() {
    for (const a of this.get()) {
      this.finderById[a.id] = a;
    }
  }

  findById(id: string) {
    return this.finderById[id];
  }

  setClass(shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http);
              this.setCache(this.cachePath, http);
              this.fillMonitorsById();
              resolve(http);
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

  add(object: Monitor): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .add(this.collection, object)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async update(object: Monitor): Promise<any> {
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
