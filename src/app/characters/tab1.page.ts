import { Component } from '@angular/core';
import {Character} from '../../classes/character';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  characterList: Character[] = [] ;

  constructor() {

    console.log(this.characterList.length);


  }


  makeSmall(word: string): string {
    return word.toLowerCase();
  }
}


