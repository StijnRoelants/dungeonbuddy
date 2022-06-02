import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, PermissionStatus, Photo} from '@capacitor/camera';
import {Storage} from '@capacitor/storage';
import {Capacitor} from '@capacitor/core';
import {Directory, Filesystem} from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CharAvatarService {

  public avatar: Photo ;
  private avatarURI: string;
  private storageKey = 'avatar';
  private permission: PermissionStatus = {camera: 'granted', photos: 'granted'};

  constructor() {
    this.loadAvatars();
  }

  public async createAvatar(): Promise<void> {
    if (Capacitor.isNativePlatform()){
      await this.avatarNative();
    } else {
      await this.avatarPWA();
    }
    await this.persistAvatarURI();
  }

  private async avatarPWA(): Promise<void> {
   const result = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

   const returnUri = await this.avatartoFileSystem(result);
   this.avatarURI = returnUri;
    result.dataUrl = `data:image/${result.format};base64,${result.base64String}`;
   this.avatar = result;
   console.log(this.avatarURI);
  }

  private async avatartoFileSystem(avatar: Photo): Promise<string> {
    const path = (new Date()).getTime() + '.' + avatar.format;
    const result = await Filesystem.writeFile({
      directory: Directory.Data,
      data: avatar.base64String,
      path
    });
    return result.uri;
  }

  private async avatarNative(): Promise<void> {
    if (!this.haveCameraPermision() && !this.havePhotosPermision()){
      await this.requestPermissions();
    }

    if (!this.haveCameraPermision() && !this.havePhotosPermision()){
      return;
    }

    const result = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source: await this.getCamerasourceNative()
    });

    this.avatarURI = result.path;
    this.avatar = result;
  }

  private async getCamerasourceNative(): Promise<CameraSource> {
    if (this.permission.photos === 'granted' && this.permission.camera === 'granted') {
      return CameraSource.Prompt;
    } else if (this.permission.photos === 'granted') {
      return CameraSource.Photos;
    }  else {
      return CameraSource.Camera;
    }
  }

  private haveCameraPermision(): boolean {
    return this.permission.camera === 'granted';
  }

  private havePhotosPermision(): boolean {
    return this.permission.photos === 'granted';
  }


  private async persistAvatarURI(): Promise<void> {
    await Storage.set({
      key: this.storageKey,
      value: JSON.stringify(this.avatarURI)
    });
  }

  private async loadAvatarURI(): Promise<void> {
    const {value} = await Storage.get({key: this.storageKey});
    this.avatarURI = JSON.parse(value) || '';
  }

  private async loadAvatars(): Promise<void> {
    await this.loadPermissions();
    await this.loadAvatarURI();
  }

  private async requestPermissions(): Promise<void> {
    try {
      this.permission = await Camera.requestPermissions();
    } catch (e) {
      console.log('PWA');
    }
  }

  private async loadPermissions(): Promise<void> {
    try {
      this.permission = await Camera.checkPermissions();
    } catch (e) {
      console.log('PWA');
    }
  }
}
