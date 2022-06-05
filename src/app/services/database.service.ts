import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {
  collection,
  Firestore,
  CollectionReference,
  DocumentReference,
  doc,
  addDoc,
  query, getDocs, Unsubscribe, where, deleteDoc, onSnapshot, updateDoc
} from '@angular/fire/firestore';
import {Character} from '../../classes/character';
import {Background} from '../../classes/backgrounds';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  subscription: Subscription;
  userID: string;
  private readonly unsubscribeAll: Unsubscribe[] = [];

  constructor(private authService: AuthService, private fireStore: Firestore) { }

  async deleteCharacter(id: string): Promise<void> {
    await deleteDoc(this.getDocumentRef('characters', id));
    return;
  }

  async updateCharacter(id: string, data: Character): Promise<void> {
    await updateDoc(this.getDocumentRef('characters', id), {...data});
    return;
  }

  async createCharacter(newCharacter: Character): Promise<void> {
    const createdCharacter: Character = newCharacter;
    /*createdCharacter.userID = this.authService.getUserUID();*/
    createdCharacter.userID = this.userID;

    //console.log(createdCharacter);

    await addDoc<Character>(
      this.getCollectionRef<Character>('characters'),
      JSON.parse(JSON.stringify(createdCharacter))
    );
  }

  async getUser(): Promise<void> {
    this.subscription = await this.authService.getUser().subscribe(x => {
      this.userID = x.uid;
    });
    this.subscription.unsubscribe();
    return;
  }

  async getCharactersByUserID(): Promise<Character[]> {

    await this.getUser();
    console.log(this.userID);

    const result = await getDocs<Character>(
      query<Character>(
        this.getCollectionRef('characters'),
        where('userID', '==', this.userID)
      )
    );
    return result.docs.map(x => ({...x.data(), key: x.id}));
  }

  async getCharacterByID(id: string, observer: ((characters: Character) => void )): Promise<Unsubscribe> {
    const result = x => observer({...x.data(), key: x.id});

    const unsubscribe = onSnapshot<Character>(
      this.getDocumentRef('characters',id),
      result
    );
    this.unsubscribeAll.push(unsubscribe);
    return unsubscribe;
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
