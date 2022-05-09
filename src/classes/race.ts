export enum Races {
  // @ts-ignore
  dragonborn = 'Dragonborn',
  dwarf = 'Dwarf',
  elf = 'Elf',
  gnome = 'Gnome',
  halfelf = 'Half-Elf',
  halforc = 'Half-Orc',
  halfling = 'Halfling',
  human = 'Human',
}

export class Race {
  id: string;
  name: string;
  speed: number;
  size: string;
  languages: string[];
  traits: string[];

  constructor() {
  }
}
