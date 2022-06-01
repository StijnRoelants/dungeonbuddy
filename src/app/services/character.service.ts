import { Injectable } from '@angular/core';
import {Background} from '../../classes/backgrounds';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(public dbService: DatabaseService) { }

  async getBackgroundData(bg: string, list: string[]): Promise<void>{
    const result: Background[] = await this.dbService.getBackgroundByName(bg);
    if (result[0] !== undefined){
      for (const p of result[0].proficiencies){
        list.push(p);
      }
    }
  }

  generateSkills(): void {

  }

}

