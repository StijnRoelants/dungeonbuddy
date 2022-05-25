import { Component } from '@angular/core';
import {Character} from '../../classes/character';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  characterList: Character[] = [] ;

  constructor(public dbService: DatabaseService) {}

  ionViewWillEnter(){
    this.dbService.getCharactersByUserID().then(x => this.characterList = x);
    console.log(this.characterList);
  }

}


