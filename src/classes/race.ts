export enum RaceType {
  dragonborn = 'Dragonborn',
  dwarf = 'Dwarf',
  elf = 'Elf',
  gnome = 'Gnome',
  halfelf = 'Half-Elf',
  halforc = 'Half-Orc',
  halfling = 'Halfling',
  human = 'Human',
}

export interface IRace {
  id: string;
  name: RaceType;
  speed: number;
  size: string;
  languages: string[];
  traits: string[];
}

export class Race implements IRace{
  id: string;
  name: RaceType;
  speed: number;
  size: string;
  languages: string[];
  traits: string[];

  constructor(race: IRace) {
    Object.assign(this, race);
  }
}
