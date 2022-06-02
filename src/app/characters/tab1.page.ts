import { Component } from '@angular/core';
import {Character} from '../../classes/character';
import {DatabaseService} from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  characterList: Character[] = [] ;
  contentLoaded = false;

  constructor(public dbService: DatabaseService, public router: Router, public activatedRoute: ActivatedRoute) {}

  async ionViewWillEnter(){
    this.contentLoaded = false;
    await this.getCharacters();
    console.log(this.characterList);
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


