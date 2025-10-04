import type { Item } from "./items";
import type {Possibility} from "./possibilities";
import {RangeCounter} from "./utils";


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

    this.character.balance = 5000;
    this.character.monthlyExpenses.add(1500);
    this.character.monthlyIncomeNetto.add(4000);
    this.character.monthlyIncomeBrutto.add(5000);

    // // // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
    this.character.educationLevel.add(1);
    this.character.mentalHealth.add(80);
    this.character.physicalHealth.add(80);
    this.character.happiness.add(80);
    this.character.maxHealth.add(100);

    this.focus.health = 1;
    this.focus.relation = 1;
    this.focus.work = 1;
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

    // Handle Items
    this.items.forEach((item: Item) => {
        item.applyMonthlyEffects(this);
      }
    )

    // Handle focuses
    this.focus.applyEffects(this);

    // Handle income from job 
    this.character.balance += this.character.monthlyIncomeNetto.get();

    // Handle ZUS account
    const zusContribution = Math.floor(this.character.monthlyIncomeBrutto.get() - this.character.monthlyIncomeNetto.get());
    this.character.zusAccountAccumulated.add(zusContribution);

    // Handle expences
    this.character.balance -= this.character.monthlyExpenses.get();
  }
}
