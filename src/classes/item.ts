
export interface IItem {
  id: string;
  name: string;
  description: string;
}

export class Item implements IItem{
  description: string;
  id: string;
  name: string;

  constructor(obj: IItem) {
    Object.assign(this, obj);
  }
}

