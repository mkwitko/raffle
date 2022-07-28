import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Module
import { SharedModule } from './modules/shared/shared.module';

//Http
import { HttpClientModule } from '@angular/common/http';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//Cache
import { IonicStorageModule } from '@ionic/storage-angular';

//Environment
import { environment } from 'src/environments/environment';

//Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//AwesomePlugins
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';

//Social Sharing
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Capacitor } from '@capacitor/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),

    //Modules
    SharedModule,

    //Http
    HttpClientModule,

    //AngularFire
    AngularFireModule.initializeApp(environment.global.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

    //Cache
    IonicStorageModule.forRoot(),

    //Toast
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.global.firebase)),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        return getAuth();
      }
    }),

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    //AwesomePlugins
    AwesomeCordovaNativePlugin,
    //Social Sharing
    SocialSharing,

    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
