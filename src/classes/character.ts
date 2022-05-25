import {Weapon} from './weapon';
import {Skills} from './skills';

export interface ICharacter {
  key?: string;
  userID: string;
  picture?: string;
  name: string;
  playerClass: string;
  hitDie: number;
  alignment: string;
  background: string;
  xp: number;
  weapons?: Weapon[];
  race: string;
  inspiration: boolean;
  passiveWisdom: number;
  proficiencyBonus: number;
  strength: number;
  strengthModif: number;
  dexterity: number;
  dexterityModif: number;
  constitution: number;
  constitutionModif: number;
  intelligence: number;
  intelligenceModif: number;
  wisdom: number;
  wisdomModif: number;
  charisma: number;
  charismaModif: number;
  stStrength: number;
  stDexterity: number;
  stConstitution: number;
  stIntelligence: number;
  stWisdom: number;
  stCharisma: number;
  skills: Skills;
  equipment?: string[];
  gold: number;
  personalTraits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  featuresAndTraits?: string[];
  armorClass: number;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  speed: number;
}

export class Character implements ICharacter {
  alignment: string;
  armorClass = 0;
  background: string;
  bonds?: string;
  charisma = 0;
  charismaModif = 0;
  constitution = 0;
  constitutionModif = 0;
  dexterity = 0;
  dexterityModif = 0;
  featuresAndTraits?: string[];
  flaws?: string;
  gold = 0;
  hitDie = 0;
  hitPoints = 0;
  maxHitPoints = 0;
  key?: string;
  ideals?: string;
  inspiration = false;
  intelligence = 0;
  intelligenceModif = 0;
  name: string;
  passiveWisdom = 0;
  personalTraits?: string;
  playerClass: string;
  proficiencyBonus = 0;
  race: string;
  skills: Skills;
  stCharisma = 0;
  stConstitution = 0;
  stDexterity = 0;
  stIntelligence = 0;
  stStrength = 0;
  stWisdom = 0;
  strength = 0;
  strengthModif = 0;
  userID: string;
  wisdom = 0;
  wisdomModif = 0;
  xp = 0;
  level = 1;
  picture?: string;
  speed = 0;

  constructor() {

  }


}
