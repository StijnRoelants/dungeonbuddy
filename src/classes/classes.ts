export enum PlayerClass {
  barbarian = 'Barbarian',
  bard = 'Bard',
  cleric = 'Cleric',
  druid = 'Druid',
  fighter = 'Fighter',
  paladin = 'Paladin',
  rogue = 'Rogue',
  ranger = 'Ranger',
  sorcerer = 'Sorcerer',
  warlock = 'Warlock',
  wizard = 'Wizard'
}

export interface IClass {
  index: string;
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  hit_die: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  class_levels: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  multi_classing: {
    prerequisites: [{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ability_score: {
        index: string;
        name: string;
        url: string;
      };
      // eslint-disable-next-line @typescript-eslint/naming-convention
      minimum_score: number;
    }];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    prerequisite_options: [{
      choose: number;
      type: string;
      from: [{
        index: string;
        name: string;
        url: string;
      }];
    }];
    proficiencies: [{
      index: string;
      name: string;
      url: string;
    }];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    proficiency_choices: [{
      choose: number;
      type: string;
      from: [{
        index: string;
        name: string;
        url: string;
      }];
    }];
  };
  spellcasting: {
    level: number;
    info: [{
      name: string;
      desc: [string];
    }];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    spellcasting_ability: {
      index: string;
      name: string;
      url: string;
    };
  };
  spells: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  starting_equipment: [{
    quantity: number;
    equipment: {
      index: string;
      name: string;
      url: string;
    };
  }];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  starting_equipment_options: [{
    choose: number;
    type: string;
    from: [
      1, {
        quantity: number;
        equipment: {
          index: string;
          name: string;
          url: string;
        };
      },
      2, {
        choose: number;
        type: string;
        from: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          equipment_category: {
            index: string;
            name: string;
            url: string;
          };
        };
      }];
  }];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  proficiency_choices: [{
    choose: number;
    type: string;
    from: [{
      index: string;
      name: string;
      url: string;
    }];
  }];
  proficiencies: [{
    index: string;
    name: string;
    url: string;
  }];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  saving_throws: [{
    index: string;
    name: string;
    url: string;
  }];
  subclasses: [{
    index: string;
    name: string;
    url: string;
  }];
}
