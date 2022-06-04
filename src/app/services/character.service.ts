import { Injectable } from '@angular/core';
import {Background} from '../../classes/backgrounds';
import {DatabaseService} from './database.service';
import {Skills} from '../../classes/skills';
import {Character} from '../../classes/character';
import { randomizerList, StandardAvatars} from '../../classes/standardAvatars';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  avatarList: StandardAvatars[];

  constructor(public dbService: DatabaseService,) { }

  async getBackgroundData(bg: string, list: string[], ): Promise<void>{
    const result: Background[] = await this.dbService.getBackgroundByName(bg);
    if (result[0] !== undefined){
      for (const p of result[0].proficiencies){
        list.push(p);
      }
    }
    return;
  }

  randomAvatar(): StandardAvatars {
    this.avatarList = randomizerList;
    const result = Math.floor(Math.random() * 5);
    console.log(result);
    return this.avatarList[result];
  }

  generateSkills(list: string[], newSkills: Skills, newCharacter: Character): void {
    this.insertBaseSkills(newSkills, newCharacter);
    for (const skill of list){
      switch (skill) {
        case 'Acrobatics': {
          newSkills.acrobatics += 1;
          break;
        }
        case 'Animal Handling': {
          newSkills.animalHandling += 1;
          break;
        }
        case 'Arcana': {
          newSkills.arcana += 1;
          break;
        }
        case 'Athletics': {
          newSkills.athletics += 1;
          break;
        }
        case 'Deception': {
          newSkills.deception += 1;
          break;
        }
        case 'History': {
          newSkills.history += 1;
          break;
        }
        case 'Insight': {
          newSkills.insight += 1;
          break;
        }
        case 'Intimidation': {
          newSkills.intimidation += 1;
          break;
        }
        case 'Investigation': {
          newSkills.investigation += 1;
          break;
        }
        case 'Medicine': {
          newSkills.medicine += 1;
          break;
        }
        case 'Nature': {
          newSkills.nature += 1;
          break;
        }
        case 'Perception': {
          newSkills.perception += 1;
          break;
        }
        case 'Performance': {
          newSkills.performance += 1;
          break;
        }
        case 'Persuasion': {
          newSkills.persuasion += 1;
          break;
        }
        case 'Religion': {
          newSkills.religion += 1;
          break;
        }
        case 'Sleight of Hand': {
          newSkills.sleightOfHand += 1;
          break;
        }
        case 'Stealth': {
          newSkills.stealth += 1;
          break;
        }
        case 'Survival': {
          newSkills.survival += 1;
          break;
        }
      }
    }
  }

  insertBaseSkills(newSkills: Skills, newCharacter: Character){
    if (newCharacter.charismaModif > 0 || newCharacter.charismaModif < 0) {
      newSkills.deception += newCharacter.charismaModif;
      newSkills.intimidation += newCharacter.charismaModif;
      newSkills.performance += newCharacter.charismaModif;
      newSkills.persuasion += newCharacter.charismaModif;
    }
    if (newCharacter.strengthModif > 0 || newCharacter.strengthModif < 0) {
      newSkills.athletics += newCharacter.strengthModif;
    }
    if (newCharacter.dexterityModif > 0 || newCharacter.dexterityModif < 0) {
      newSkills.acrobatics += newCharacter.dexterityModif;
      newSkills.sleightOfHand += newCharacter.dexterityModif;
      newSkills.stealth += newCharacter.dexterityModif;
    }
    if (newCharacter.wisdomModif > 0 || newCharacter.wisdomModif < 0) {
      newSkills.animalHandling += newCharacter.wisdomModif;
      newSkills.insight += newCharacter.wisdomModif;
      newSkills.medicine += newCharacter.wisdomModif;
      newSkills.perception += newCharacter.wisdomModif;
      newSkills.survival += newCharacter.wisdomModif;
    }
    if (newCharacter.intelligenceModif > 0 || newCharacter.intelligenceModif < 0) {
      newSkills.arcana += newCharacter.intelligenceModif;
      newSkills.history += newCharacter.intelligenceModif;
      newSkills.investigation += newCharacter.intelligenceModif;
      newSkills.nature += newCharacter.intelligenceModif;
      newSkills.religion += newCharacter.intelligenceModif;
    }
    return;
  }

  calculateStartingGold(playerClass: string): number {
    switch (playerClass) {
      case 'Barbarian': {
        return this.generateRandoms(2,4);
      }
      case 'Bard': {
        return this.generateRandoms(5,4);
      }
      case 'Cleric': {
        return this.generateRandoms(5,4);
      }
      case 'Druid': {
        return this.generateRandoms(2,4);
      }
      case 'Fighter': {
        return this.generateRandoms(5,4);
      }
      case 'Paladin': {
        return this.generateRandoms(5,4);
      }
      case 'Ranger': {
        return this.generateRandoms(5,4);
      }
      case 'Rogue': {
        return this.generateRandoms(4,4);
      }
      case 'Sorcerer': {
        return this.generateRandoms(3,4);
      }
      case 'Warlock': {
        return this.generateRandoms(4,4);
      }
      case 'Wizard': {
        return this.generateRandoms(4,4);
      }
    }
  }

  generateRandoms(numberOfRoles: number, diceType: number): number {
    let results = 0;

    for (let i = 0; i < numberOfRoles; i++) {
      const score = Math.floor(Math.random() * diceType) + 1;
      results += score;
    }
    return results * 10;
  }


  levelUp(character: Character) {
    if (character.level === 20) {
      return;
    }
    switch (character.level) {
      case 0: {
        character.level++;
        character.xpToNextLevel = 300;
        break;
      }
      case 1: {
        character.level++;
        character.xpToNextLevel = 900;
        break;
      }
      case 2: {
        character.level++;
        character.xpToNextLevel = 2700;
        break;
      }
      case 3: {
        character.level++;
        character.xpToNextLevel = 6500;
        break;
      }
      case 4: {
        character.level++;
        character.xpToNextLevel = 14000;
        character.proficiencyBonus++;
        break;
      }
      case 5: {
        character.level++;
        character.xpToNextLevel = 23000;
        break;
      }
      case 6: {
        character.level++;
        character.xpToNextLevel = 34000;
        break;
      }
      case 7: {
        character.level++;
        character.xpToNextLevel = 48000;
        break;
      }
      case 8: {
        character.level++;
        character.xpToNextLevel = 64000;
        character.proficiencyBonus++;
        break;
      }
      case 9: {
        character.level++;
        character.xpToNextLevel = 85000;
        break;
      }
      case 10: {
        character.level++;
        character.xpToNextLevel = 100000;
        break;
      }
      case 11: {
        character.level++;
        character.xpToNextLevel = 120000;
        break;
      }
      case 12: {
        character.level++;
        character.xpToNextLevel = 140000;
        character.proficiencyBonus++;
        break;
      }
      case 13: {
        character.level++;
        character.xpToNextLevel = 165000;
        break;
      }
      case 14: {
        character.level++;
        character.xpToNextLevel = 195000;
        break;
      }
      case 15: {
        character.level++;
        character.xpToNextLevel = 225000;
        break;
      }
      case 16: {
        character.level++;
        character.xpToNextLevel = 265000;
        character.proficiencyBonus++;
        break;
      }
      case 17: {
        character.level++;
        character.xpToNextLevel = 305000;
        break;
      }
      case 18: {
        character.level++;
        character.xpToNextLevel = 355000;
        break;
      }
      case 19: {
        character.level++;
        break;
      }
    }
  }
}
