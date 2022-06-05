import { Component } from '@angular/core';
import {FirebaseApp} from '@angular/fire/app';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn: boolean;
  imgURL: string;
  username: string;
  userEmail: string;
  subscription: Subscription = new Subscription();

  constructor(firebaseApp: FirebaseApp, public authService: AuthService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit(){
    await this.getData();
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  async getData(): Promise<void> {
    this.subscription = this.authService.getUser().subscribe(x => {
      if (x !== undefined){
        this.isLoggedIn = true;
        this.username = x.displayName;
        this.userEmail = x.email;
        this.imgURL = x.photoURL;
      } else {
        this.isLoggedIn = false;
      }
    });
  }


}

