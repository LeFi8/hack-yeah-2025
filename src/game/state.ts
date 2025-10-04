import type {Possibility} from "./posibilities.ts";

export interface Item {
  // type: 'person' | 'car' | 'house' | 'work'
  applyEffects: (state: State) => void,
}

export class CharacterCondition {
  balance: number = 0
  mentalHealth: number = 0
  physicalHealth: number = 0
  monthlyExpenses: number = 0
  monthlyIncome: number = 0
}

export class Focus {
  health: number = 0
  relation: number = 0
  work: number = 0

  applyEffects(state: State) {
    // state.character.physicalHealth += this.health
    // state.character.mentalHealth += this.health
  }
}

export class State {
  public age: number = 0;
  public character: CharacterCondition
  public items: Item[] = [];
  public focus: Focus;
  public currentPossibilities: Possibility[] = []

  constructor() {
    this.character = new CharacterCondition()
    this.focus = new Focus()
  }

  initialize() {
    this.age = 18;
  }

  shouldGameEnd(): boolean {
    return false
  }

  setFocus(focus: Focus) {
    this.focus = focus;
  }
}
