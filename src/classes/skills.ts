export interface ISkills {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
}

export class Skills implements ISkills{
  acrobatics = 0;
  animalHandling = 0;
  arcana = 0;
  athletics = 0;
  deception = 0;
  history = 0;
  insight = 0;
  intimidation = 0;
  investigation = 0;
  medicine = 0;
  nature = 0;
  perception = 0;
  performance = 0;
  persuasion = 0;
  religion = 0;
  sleightOfHand = 0;
  stealth = 0;
  survival = 0;

  constructor() {
  }
}
