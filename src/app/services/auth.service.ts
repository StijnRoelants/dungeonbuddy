import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {Router} from '@angular/router';
import {Auth, signInWithCredential, signOut} from '@angular/fire/auth';
import {updateProfile, GoogleAuthProvider, PhoneAuthProvider, User, FacebookAuthProvider} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';
import { GithubAuthProvider } from 'firebase/auth';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*private currentUser: null | User = null;*/
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  private verificationId: string;
  private subscription: Subscription;

  constructor(public auth: Auth, public router: Router) {
    this.auth.onAuthStateChanged((user: User) => {
      if (user) {
        this.currentUser.next(user);
        /*console.log(this.currentUser);*/
        this.router.navigate(['/']).then();
      }
    });
    /*this.auth.onAuthStateChanged(user => this.setCurrentUser(user));*/
  }

  getUser(): Observable<any> {
    return this.currentUser;
  }

  /*
  isLoggedIn(): any {
    this.currentUser.subscribe(x => {
      if (x !== undefined) {
        return true;
      }else {
        return false;
      }
    });
    return this.currentUser !== undefined;
  }*/

  /*
  getProfilePic(): string {
    return this.currentUser && this.currentUser.photoURL
  }

  getDisplayName(): string | undefined {
    return this.currentUser ? this.currentUser.displayName : undefined;
  }

  getEmail(): string | undefined {
    return this.currentUser ? this.currentUser.email : undefined;
  }

  getUserUID(): string | undefined {
    return this.currentUser ? this.currentUser.uid : undefined;
  }
  */

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
    this.currentUser = new BehaviorSubject<User>(undefined);
  }

  async signInWithGoogle(): Promise<void> {
    const {credential: {idToken, accessToken}} = await FirebaseAuthentication.signInWithGoogle();

    if (Capacitor.isNativePlatform()) {

      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(this.auth, credential);
    }
  }

  async signInWithFacebook(): Promise<void> {
    const {credential: {accessToken}} = await FirebaseAuthentication.signInWithFacebook();
    console.log(this.currentUser);

    if (Capacitor.isNativePlatform()) {

      const credential = FacebookAuthProvider.credential(accessToken);
      await signInWithCredential(this.auth, credential);
    }
  }

  async signInWithGitHub(): Promise<void> {
    const {credential: {idToken}} = await FirebaseAuthentication.signInWithGithub();
    console.log(this.currentUser);

    if (Capacitor.isNativePlatform()) {

      const credential = GithubAuthProvider.credential(idToken);
      await signInWithCredential(this.auth, credential);
    }
  }

  async sendPhoneVerificationCode(phoneNumber: string): Promise<void> {

    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const {verificationId} = await FirebaseAuthentication.signInWithPhoneNumber({phoneNumber});
    this.verificationId = verificationId;
  }

  async signInWithPhoneNumber(verificationCode: string): Promise<void> {

    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const credential = PhoneAuthProvider.credential(this.verificationId, verificationCode);
    await signInWithCredential(this.auth, credential);
  };

  async updateDisplayName(displayName: string): Promise<void> {
    await updateProfile(this.auth.currentUser, {
      displayName
    });
  }
}
