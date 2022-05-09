import {IItem} from './item';


export class Potion implements IItem{
  description: string;
  id: string;
  name: string;
  modifier: number;

  constructor(obj: IItem) {
    Object.assign(this, obj);
  }
}
