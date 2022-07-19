import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { CampaingClass } from './../campaing/campaing';
import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { User } from 'src/app/interfaces/auth/user';

@Injectable()
export class UserClass {
  private userInfo: User;
  private userInfoEdit: User;
  private cachePath = environment.global.path.users;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.users;
  private interfaceRef: User;
  private anon = false;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
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
    return this.userInfo;
  }

  getEdit() {
    return this.userInfoEdit;
  }

  getAnon() {
    return this.anon;
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
    this.userInfo = value;

    if (this.get() === undefined) {
      this.setAnon(true);
    } else {
      this.setAnon(false);
    }
  }

  setEdit(value) {
    this.userInfoEdit = value;
  }

  setPicture(value) {
    this.userInfoEdit.avatar = value;
  }

  reset() {
    this.userInfo = null;
  }

  resetEdit() {
    this.userInfoEdit = null;
  }

  deleteAll(res) {
    for (const a of res) {
      this.crud.delete(this.collection, a.id);
    }
  }

  setClass(id, shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getHttp(id)
            .then((http) => {
              this.set(http);
              this.setEdit(http);
              this.setCache(http);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          this.setEdit(cache);
          resolve(cache);
        }
      });
    });
  }

  add(user: User, id: string, withDate = true) {
    if (withDate) {
      user.userCreatedAt = Date.now();
    }
    this.crud.addUser(this.collection, user, id);
  }

  update(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, user, user.userId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setAnon(bool) {
    if (bool) {
      this.userInfo = {
        userEmail: 'Venha fazer parte da Papada!',
        userName: 'Usuário anônimo',
      };
    }
    this.anon = bool;
  }
}
