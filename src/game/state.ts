import type {Possibility} from "./possibilities";
import {RangeCounter} from "./utils";
import type {Item} from "./items";


export class CharacterCondition {
  balance = 0
  monthlyExpenses = new RangeCounter(0, 0, null)
  monthlyIncomeNetto  = new RangeCounter(0, 0, null)
  monthlyIncomeBrutto = new RangeCounter(0, 0, null)
  zusAccountAccumulated = new RangeCounter(0, 0, null)

  // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
  educationLevel = new RangeCounter(0, 0, 4)
  mentalHealth = new RangeCounter(0, 0, 100)
  physicalHealth = new RangeCounter(0, 0, 100)
  happiness = new RangeCounter(0, 0, 100)

  // TODO: dynamically change max health with age
  maxHealth = new RangeCounter(100, 0, 100)
}

export class Focus {
  health: number = 0
  relation: number = 0
  work: number = 0

  applyEffects(_state: State) {
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
    // TODO: init random init state
  }

  shouldGameEnd(): boolean {
    return false
  }

  setFocus(focus: Focus) {
    this.focus = focus;
  }

  // TODO: handle items, focuses, monthly income and spent
  applyMonthlyEffects() {
    console.log("Applying monthly effects...");
  }

  addItem(item: Item) {
    if (item.monthlyCost) {
        this.character.monthlyExpenses.add(item.monthlyCost)
    }
    this.items.push(item)
  }

  removeItem(item: Item) {
    if (item.monthlyCost) {
        this.character.monthlyExpenses.add(-item.monthlyCost)
    }
    this.items = this.items.filter(i => i !== item)
  }
}
