import {Weapon} from './weapon';
import {Race} from './race';
import {Skills} from './skills';

export interface Character {
  id: string;
  name: string;
  class: string;
  hitDie: number;
  alignment: string;
  background: string;
  xp: number;
  weapons?: Weapon[];
  race: Race;
  inspiration: number;
  passiveWisdom: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  stStrength: number;
  stDexterity: number;
  stConstitution: number;
  stIntelligence: number;
  stWisdom: number;
  stCharisma: number;
  skills: Skills;
  equipment: string[];
  gold: number;
  personalTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  featuresAndTraits: string[];
}
