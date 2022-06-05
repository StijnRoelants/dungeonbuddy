export enum Dtype {
  d20 = 'D20',
  d12 = 'D12',
  d10 = 'D10',
  d8 = 'D8',
  d6 = 'D6',
  d4 = 'D4',
}

export interface IDiceType {
  count: number;
  diceType: Dtype;
}

export class DiceType implements IDiceType {
  count: number;
  diceType: Dtype;

  constructor(obj: IDiceType) {
    Object.assign(this, obj);
  }
}
