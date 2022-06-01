import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {
  collection,
  Firestore,
  CollectionReference,
  DocumentReference,
  doc,
  addDoc,
  query, getDocs, orderBy, where, getDoc
} from '@angular/fire/firestore';
import {Character} from '../../classes/character';
import {Background} from '../../classes/backgrounds';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private authService: AuthService, private fireStore: Firestore) { }

  async createCharacter(newCharacter: Character): Promise<void> {
    const createdCharacter: Character = newCharacter;
    createdCharacter.userID = this.authService.getUserUID();

    //console.log(createdCharacter);

    await addDoc<Character>(
      this.getCollectionRef<Character>('characters'),
      JSON.parse(JSON.stringify(createdCharacter))
    );
  }

  async getCharactersByUserID(): Promise<Character[]> {
    const result = await getDocs<Character>(
      query<Character>(
        this.getCollectionRef('characters'),
        where('userID', '==', this.authService.getUserUID())
      )
    );
    return result.docs.map(x => ({...x.data(), key: x.id}));
  }

  async getCharacterByID(observer: ((characters: Character[]) => void )): Promise<void> {

  }

  async getBackgroundByName(name: string): Promise<Background[]> {
    console.log(name);
    const result = await getDocs<Background>(
      query<Background>(
        this.getCollectionRef('backgrounds'),
        where('name', '==', name)
      )
    );
    return result.docs.map(x => ({...x.data(), key: x.id}));
    };


  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }

  private getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore, collectionName, id) as DocumentReference<T>;
  }
}
