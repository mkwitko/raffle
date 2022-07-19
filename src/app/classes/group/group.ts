import { Group } from '../../interfaces/groups/group';
import { CacheService } from '../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from '../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Injectable()
export class GroupClass {
  private info: Group;
  private userGroup: Group;
  private cachePath = environment.global.path.groups;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.groups;
  private interfaceRef: Group;

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
    return this.info;
  }

  getUserGroup() {
    return this.userGroup;
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
    this.info = value;
  }

  setUserGroup(value) {
    this.userGroup = value;
  }

  reset() {
    this.info = null;
  }

  getMyGroup(id) {
    for (const a in this.get()) {
      console.log(this.get()[a].id, id);
      if (this.get()[a].id === id) {
        console.log(this.get()[a]);
        return this.get()[a];
      } else {
        console.log('else');
      }
    }
  }

  setClass(id, shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http);
              this.setUserGroup(this.getMyGroup(id));
              this.setCache(http);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          this.setUserGroup(this.getMyGroup(id));
          resolve(cache);
        }
      });
    });
  }

  add(object: Group) {
    this.crud.add(this.collection, object);
  }

  update(object: Group): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, object, object.id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
