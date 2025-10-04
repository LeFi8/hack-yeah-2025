import {Possibility} from "./posibilities.ts";

export interface Item {
  // type: 'person' | 'car' | 'house' | 'work'
  applyEffects: (state: State) => void,
}

export class CharacterCondition {
  savings: number = 0
  monthlyExpenses: number = 0
  monthlyIncomeNetto: number = 0
  monthlyIncomeBrutto: number = 0
  zusAccountAccumulated: number = 0

  // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
  educationLevel: number = 0
  mentalHealth: number = 0
  physicalHealth: number = 0
  happiness: number = 0

  maxHealth: number = 100
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
}
