import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {enableIndexedDbPersistence, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';
/* Added skillChoiceComponent so *ng.. could be used in Modals */
import {SkillChoiceComponent} from './components/skill-choice/skill-choice.component';

@NgModule({
  declarations: [AppComponent,SkillChoiceComponent],
  entryComponents: [SkillChoiceComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule,
  provideFirebaseApp( () => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
