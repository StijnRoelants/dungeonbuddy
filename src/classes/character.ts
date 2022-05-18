import {Weapon} from './weapon';
import {Race} from './race';
import {Skills} from './skills';

export interface ICharacter {
  id: string;
  userID: string;
  name: string;
  playerClass: string;
  hitDie: number;
  alignment: string;
  background: string;
  xp: number;
  weapons?: Weapon[];
  race: Race;
  inspiration: number;
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
  personalTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  featuresAndTraits: string[];
  armorClass: number;
}

export class Character implements ICharacter {
  alignment: string;
  armorClass: number;
  background: string;
  bonds: string;
  charisma: number;
  charismaModif: number;
  constitution: number;
  constitutionModif: number;
  dexterity: number;
  dexterityModif: number;
  featuresAndTraits: string[];
  flaws: string;
  gold: number;
  hitDie: number;
  id: string;
  ideals: string;
  inspiration: number;
  intelligence: number;
  intelligenceModif: number;
  name: string;
  passiveWisdom: number;
  personalTraits: string;
  playerClass: string;
  proficiencyBonus: number;
  race: Race;
  skills: Skills;
  stCharisma: number;
  stConstitution: number;
  stDexterity: number;
  stIntelligence: number;
  stStrength: number;
  stWisdom: number;
  strength: number;
  strengthModif: number;
  userID: string;
  wisdom: number;
  wisdomModif: number;
  xp: number;

}
