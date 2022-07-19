import { UserClass } from './../users/user';
import { Campaing } from './../../interfaces/campaing/campaing';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'src/app/interfaces/auth/user';
import { Group } from 'src/app/interfaces/groups/group';
import { SolicitationInterface } from 'src/app/interfaces/solicitation/solicitation-interface';
import { CacheService } from 'src/app/services/cache/cache.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Solicitation {
  public finder;
  private info;
  private userSolicitation: SolicitationInterface;
  private cachePath = environment.global.path.solicitation;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.solicitation;
  private interfaceRef: SolicitationInterface;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private user: UserClass
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

  filler(value) {
    const result = [];
    for (const a of value) {
      result[a.id] = a;
    }
    this.finder = result;
  }

  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.info;
  }

  getUserSolicitation() {
    return this.userSolicitation;
  }

  getCollection() {
    return this.collection;
  }

  getRef() {
    return this.ref;
  }

  setCache(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(this.cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    let result = [];
    for (const a of value) {
      let push = a;
      this.getUserFromSolictation(a.userId).then((res) => {
        console.log(res);
        push.name = res.userName;
        push.userId = res.userId;
      });
      result.push(push);
    }
    this.filler(result);
    this.info = result;
  }

  setuserSolicitation(value) {
    this.userSolicitation = value;
  }

  reset() {
    this.info = null;
  }

  getMySolicitation(id) {
    for (const a in this.get()) {
      if (this.get()[a].id === id) {
        return this.get()[a];
      }
    }
  }

  getUserFromSolictation(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user
        .getHttp(id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setClass(id?, shouldUpdate = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http);
              if (id) {
                this.setuserSolicitation(this.getMySolicitation(id));
              }
              this.setCache(http);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          if (id) {
            this.setuserSolicitation(this.getMySolicitation(id));
          }
          resolve(cache);
        }
      });
    });
  }

  add(object: Group) {
    this.crud.add(this.collection, object);
  }

  async update(object: Group): Promise<any> {
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

  async delete(id): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      this.crud
        .delete(this.collection, id)
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

  createSolicitation(campaing: Campaing, userId, autoApprove = false) {
    const solicitation: SolicitationInterface = {
      userId,
      campaignId: campaing.id,
      ticketsInitial: campaing.ticketsShare + 1,
      ticketsFinal: campaing.ticketsShare + 10,
      createdAt: new Date().getTime(),
      approved: autoApprove,
    };
    return solicitation;
  }
}
