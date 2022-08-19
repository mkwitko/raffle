import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { ScreenService } from './../screen/screen.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { User } from 'src/app/interfaces/auth/user';
import { Injectable } from '@angular/core';
import {
  indexedDBLocalPersistence,
  initializeAuth,
  deleteUser,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
} from 'firebase/auth';
import { from } from 'rxjs';
import { TranslateService } from '../translate/translate.service';
import { UserClass } from 'src/app/classes/users/user';
import { CampaingClass } from 'src/app/classes/campaing/campaing';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly auth: Auth;

  constructor(
    private navigation: NavigationService,
    private screen: ScreenService,
    private translante: TranslateService,
    private userClass: UserClass,
    private campaignClass: CampaingClass,
    private solicitation: Solicitation
  ) {
    this.auth = getAuth();
  }

  async login(user: User) {
    if (!user.userEmail || !user.password) {
      this.screen.presentToast('Preencha todos os campos.');
    } else {
      await this.screen.presentLoading();
      return from(
        signInWithEmailAndPassword(
          this.auth,
          user.userEmail.trim(),
          user.password.trim()
        )
          // .then((info) => {
          //   const id = info.user.uid;
          //   const email = info.user.email;
          //   const createdAt = info.user.metadata.creationTime;
          //   console.log('Info  - ', info);
          //   this.userClass.getHttp(id).then((res) => {
          //     if (!res) {
          //       const user: User = {
          //         userId: id,
          //         userEmail: email,
          //         userName: null,
          //         password: null,
          //         avatar: null,
          //         cpf: null,
          //         telefone: null,
          //         userCreatedAt: Date.parse(createdAt),
          //         status: null,
          //         ultimoContrato: null,
          //         token: null,
          //       };
          //       this.userClass.add(user, id, false);
          //       console.log('Added to db - ', user);
          //     }
          //   });
          // })
          .catch((err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
          })
          .finally(() => {
            this.screen.dismissloading();
          })
      );
    }
  }

  async loginGuest() {
    await this.screen.presentLoading();
    return from(
      signInAnonymously(this.auth)
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  async logout() {
    this.navigation.goTo('login');
    await this.screen.presentLoading();
    return from(
      this.auth
        .signOut()
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  getAuth() {
    return this.auth;
  }

  async register(user: User, confirmPassword: string) {
    if (
      !user.userEmail ||
      !user.userName ||
      !user.password ||
      !confirmPassword
    ) {
      this.screen.presentToast('Preencha todos os campos.');
    } else {
      if (user.password !== confirmPassword) {
        this.screen.presentToast('Senhas não são iguais.');
      } else {
        await this.screen.presentLoading();
        return from(
          createUserWithEmailAndPassword(
            this.auth,
            user.userEmail.trim(),
            user.password.trim()
          )
            .then((res) => {
              this.userClass.add(user, res.user.uid);
              this.campaignClass.getAllHttp().then((campaign) => {
                console.log('Register - ', campaign);
                const solicitation = this.solicitation.createSolicitation(
                  campaign[0],
                  res.user.uid
                );
                console.log('Solicitation - ', solicitation);
                this.solicitation.add(solicitation);
              });
            })
            .catch((err) => {
              this.screen.presentToast(this.translante.verifyErrors(err.code));
              console.log(err);
            })
            .finally(() => {
              this.screen.dismissloading();
            })
        );
      }
    }
  }

  async resetPassword(email: string) {
    await this.screen.presentLoading();
    return from(
      sendPasswordResetEmail(this.auth, email.trim())
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  async delete() {
    await this.screen.presentLoading();
    return from(
      this.auth.currentUser
        .delete()
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }
}
