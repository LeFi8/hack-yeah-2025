import type { Item } from "./items";
import type {Possibility} from "./possibilities";
import {BooleanFocus} from "./utils";
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
  hobby = new BooleanFocus()
  health = new BooleanFocus()
  relation = new BooleanFocus()
  work = new BooleanFocus()

  private chance(probability: number): boolean {
    return Math.random() < probability;
  }

  applyEffects(_state: State) {
    // If Health focus is active you have 70% to increase health,
    // otherwise 50% to decrease it
    if (this.health.get() && this.chance(0.7)) {
      _state.character.physicalHealth.add(1);
    } else if (this.chance(0.5)) {
      _state.character.physicalHealth.add(-1);
    }

    // If Relation focus is active you have 80% to increase hapiness
    // and 60% to increase mental health,
    // otherwise 50% to decrease happiness and mental health
    if (this.relation.get()) {
      if (this.chance(0.8)) {
        _state.character.happiness.add(1);
      }
      if (this.chance(0.6)) {
        _state.character.mentalHealth.add(1);
      }
    } else if (this.chance(0.5)) {
      _state.character.happiness.add(-1);
      _state.character.mentalHealth.add(-1);
    }

    // If we focus on work we have like 15% chance 
    // of decrasing mental health, physical health and happiness
    if (!this.work.get()) {
      if (this.chance(0.15)) {
        _state.character.mentalHealth.add(-1);
      }
      if (this.chance(0.15)) {
        _state.character.physicalHealth.add(-1);
      }
      if (this.chance(0.15)) {
        _state.character.happiness.add(-1);
      }
    }

    if (this.hobby.get() && this.chance(0.6)) {
      _state.character.happiness.add(1);
    }
  }
}

export class State {
  public age: number = 0;
  private monthsElapsed: number = 0; // Track months since game start
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
    this.monthsElapsed = 0;

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

    this.focus.health.set(true);
    this.focus.relation.set(false)
    this.focus.work.set(true)
    this.focus.hobby.set(false)
  }

  increaseMonthsElapsed() {
    this.monthsElapsed += 1;
  }

  getMonthsElapsed(): number {
    return this.monthsElapsed;
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
