import {IItem} from './item';

export class Weapon implements IItem {
  description: string;
  id: string;
  name: string;
  hitDie: number;
  atkBonus?: number;

  constructor(obj: IItem) {
    Object.assign(this, obj);
  }
}
