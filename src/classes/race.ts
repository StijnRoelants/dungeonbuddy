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
  index: string;
  name: string;
  url: string;
  speed: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ability_bonuses: [{
    bonus: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
  }];
  alignment: string;
  age: string;
  size: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  size_description: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  starting_proficiencies: [{
    index: string;
    name: string;
    url: string;
  }];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  starting_proficiency_options: {
    choose: number;
    type: string;
    from: [{
      index: string;
      name: string;
      url: string;
    }];
  };
  languages: [{
    index: string;
    name: string;
    url: string;
  }];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  language_desc: string;
  traits: [{
    index: string;
    name: string;
    url: string;
  }];
  subraces: [{
    index: string;
    name: string;
    url: string;
  }];
}


