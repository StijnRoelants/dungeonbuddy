import { Component } from '@angular/core';
import {Character} from '../../classes/character';
import {DatabaseService} from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  characterList: Character[] = [] ;
  userID: string;
  subscription: Subscription = new Subscription();
  observer: Observable<any>;
  contentLoaded = false;

  constructor(public dbService: DatabaseService, public router: Router, public activatedRoute: ActivatedRoute ,
              public authService: AuthService) {}

  async ionViewWillEnter(){
    await this.getData();
  }

  ionViewDidLeave() {
    /*console.log('I quit!');*/
    this.subscription.unsubscribe();
  }

  async getData(): Promise<void> {
    this.subscription = this.authService.getUser().subscribe(x => {
      if (x !== undefined){
        this.contentLoaded = false;
        this.getCharacters();
      } else {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  async getCharacters(): Promise<void> {
    await this.dbService.getCharactersByUserID().then(x => this.characterList = x);
    this.contentLoaded = true;
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.dbService.deleteCharacter(id);
    await this.dbService.getCharactersByUserID().then(x => this.characterList = x);
  }
}


