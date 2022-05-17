import { Injectable } from '@angular/core';
import {Race} from '../../classes/race';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private races: Race[] = [];

  constructor() { }
}
