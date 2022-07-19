import { User } from 'src/app/interfaces/auth/user';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ScreenService } from '../screen/screen.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '../translate/translate.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private screen: ScreenService,
    private translate: TranslateService
  ) {}

  collectionConstructor<T>(name) {
    return this.afs.collection<T>(name);
  }

  getAll(collection: AngularFirestoreCollection) {
    return collection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getLimit(path, length, limit, page = 1) {
    let startAfter = length;
    if (page > 1) {
      startAfter = length - (page - 1) * limit;
    }
    return this.afs
      .collection(path, (ref) =>
        ref.limit(limit).orderBy('index', 'desc').startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  get<T>(collection: AngularFirestoreCollection, yourInterface: T, id: string) {
    return collection.doc<typeof yourInterface>(id).valueChanges();
  }

  addUser(
    collection: AngularFirestoreCollection,
    yourAsset: User,
    uid: string
  ) {
    return collection.doc(uid).set({
      userId: yourAsset.userId ? yourAsset.userId : uid,
      userEmail: yourAsset.userEmail ? yourAsset.userEmail : '',
      userName: yourAsset.userName ? yourAsset.userName : '',
      userCreatedAt: yourAsset.userCreatedAt ? yourAsset.userCreatedAt : '',
      role: 'user',
      super: false,
      groupId: ' ZGn06nBznLMoMeV3Eh1u',
    });
  }

  add<T>(collection: AngularFirestoreCollection, yourAsset: T): Promise<any> {
    return new Promise((resolve, reject) => {
      collection
        .add(yourAsset)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
          reject(err);
        });
    });
  }

  update<T>(collection: AngularFirestoreCollection, yourAsset: T, id: string) {
    return collection
      .doc<any>(id)
      .update(yourAsset)
      .catch((err) => {
        this.screen.presentToast(this.translate.verifyErrors(err.code));
      });
  }

  delete(collection: AngularFirestoreCollection, id: string) {
    return collection
      .doc(id)
      .delete()
      .catch((err) => {
        this.screen.presentToast(this.translate.verifyErrors(err.code));
      });
  }

  //******* Uploads ******//

  async upload(
    bannerId: string,
    file: string,
    storageFolder: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file && file.length > 0) {
        try {
          this.storage
            .ref(storageFolder)
            .child(bannerId)
            .put(file[0])
            .then(() => {
              resolve(
                this.storage
                  .ref(storageFolder + '/' + bannerId)
                  .getDownloadURL()
                  .toPromise()
              );
            })
            .catch((error) => {
              console.log(error);
              reject(false);
            });
        } catch (error) {
          console.log(error);
          reject(false);
        }
      } else {
        console.log('Else ');
        reject(false);
      }
    });
  }

  async deleteFireStorage(ref: string) {
    const photoRef = this.storage.refFromURL(ref);
    await this.screen.presentLoading();
    try {
      await photoRef.delete();
      this.screen.dismissloading();
    } catch (error) {
      this.screen.presentToast(error.message);
      this.screen.dismissloading();
    }
  }
}
