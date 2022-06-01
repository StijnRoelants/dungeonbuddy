import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {Router} from '@angular/router';
import {Auth, getAuth, signInWithCredential, signInWithCustomToken, signInWithPopup, signOut} from '@angular/fire/auth';
import {updateProfile, GoogleAuthProvider, PhoneAuthProvider, User, FacebookAuthProvider} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';
import { GithubAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: null | User = null;
  private verificationId: string;

  constructor(public auth: Auth, public router: Router) {
    this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getProfilePic(): string {
    // eslint-disable-next-line max-len
    return this.currentUser && this.currentUser.photoURL ? this.currentUser.photoURL : 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
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

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
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

  private async setCurrentUser(user: User): Promise<void> {
    this.currentUser = user;
    if (this.currentUser) {
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['/', 'login']);
    }
  }
}
