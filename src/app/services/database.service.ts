import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {collection, Firestore, CollectionReference, DocumentReference, doc, addDoc} from '@angular/fire/firestore';
import {Character} from '../../classes/character';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private authService: AuthService, private fireStore: Firestore) { }

  async createCharacter(newCharacter: Character): Promise<void> {
    const createdCharacter: Character = newCharacter;
    createdCharacter.userID = this.authService.getUserUID();

    console.log(createdCharacter);

    await addDoc<Character>(
      this.getCollectionRef<Character>('characters'),
      createdCharacter
    );
  }


  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }

  private getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore, collectionName, id) as DocumentReference<T>;
  }
}
