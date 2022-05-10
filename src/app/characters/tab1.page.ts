import { Component } from '@angular/core';
import {Character} from '../../classes/character';
import {Race} from '../../classes/race';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  testrace: Race = {
    id: '55xc', languages: ['Common','Elvish'], name: 'Halfling', size: 'small', speed: 25, traits: ['lightfoot']
  };
  char: Character = {
    alignment: 'Chaotic-Evil',
    background: 'Test',
    bonds: 'Test',
    charisma: 0,
    charismaModif: 0,
    constitution: 0,
    constitutionModif: 0,
    dexterity: 0,
    dexterityModif: 0,
    featuresAndTraits: [],
    flaws: '',
    gold: 0,
    hitDie: 0,
    ideals: 'Test',
    inspiration: 0,
    intelligence: 0,
    intelligenceModif: 0,
    passiveWisdom: 0,
    personalTraits: '',
    playerClass: 'Bard',
    proficiencyBonus: 0,
    race: this.testrace,
    skills: undefined,
    stCharisma: 0,
    stConstitution: 0,
    stDexterity: 0,
    stIntelligence: 0,
    stStrength: 0,
    stWisdom: 0,
    strength: 0,
    strengthModif: 0,
    userID: 'xcxcxc',
    wisdom: 0,
    wisdomModif: 0,
    xp: 0,
    name: 'Lindal',
    id: 'UGVHGVHGVHGV'
  };
  characterList: Character[] = [] ;

  constructor() {
    this.characterList.push(this.char);
    console.log(this.characterList.length);
    console.log(this.char.name);


  }


  makeSmall(word: string): string {
    return word.toLowerCase();
  }
}


