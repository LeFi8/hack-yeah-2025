import { DeathCalculator } from "./death/deathCalculator";
import type { Item } from "./items";
import type { Possibility } from "./possibilities";
import { BooleanFocus } from "./utils";
import { RangeCounter } from "./utils";
import type { History } from "./utils/history";
import { JobContract } from "./work";

export class CharacterCondition {
  balance = 0;
  additionalMonthlyIncome: number = 0;
  monthlyExpenses = new RangeCounter(0, 0, null);

  mentalHealth = new RangeCounter(0, 0, 100);
  physicalHealth = new RangeCounter(0, 0, 100);
  happiness = new RangeCounter(0, 0, 100);

  // TODO: dynamically change max health with age
  maxHealth = new RangeCounter(100, 0, 100);

  clone(): CharacterCondition {
    const clone = new CharacterCondition();
    clone.balance = this.balance;
    clone.additionalMonthlyIncome = this.additionalMonthlyIncome;
    clone.monthlyExpenses = new RangeCounter(
      this.monthlyExpenses.get(),
      0,
      null,
    );
    clone.mentalHealth = new RangeCounter(this.mentalHealth.get(), 0, 100);
    clone.physicalHealth = new RangeCounter(this.physicalHealth.get(), 0, 100);
    clone.happiness = new RangeCounter(this.happiness.get(), 0, 100);
    clone.maxHealth = new RangeCounter(this.maxHealth.get(), 0, 100);
    return clone;
  }
}

export class Focus {
  hobby = new BooleanFocus();
  health = new BooleanFocus();
  relation = new BooleanFocus();
  work = new BooleanFocus();

  constructor(
    hobby: boolean,
    health: boolean,
    relation: boolean,
    work: boolean,
  ) {
    this.hobby.set(hobby);
    this.health.set(health);
    this.relation.set(relation);
    this.work.set(work);
  }

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

export class Education {
  // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
  level = new RangeCounter(0, 0, 4);
  fieldOfStudy: string = "";
  isStudying: boolean = false;

  applyMonthlyEffects(state: State) {}
}

export class ZUS {
  isAlreadyRetired: boolean = false;
  alreadyAccummulated: number = 0;
  // It needs to be caluclated each month based on job income and type
  // It tells you how much you will get when retired
  predictedPension: number = 0;
}

export class State {
  public age: number = 0;
  private monthsElapsed: number = 0; // Track months since game start
  public character: CharacterCondition;
  public job: JobContract | null = null;
  public education: Education = new Education();
  public zus: ZUS = new ZUS();
  public items: Item[] = [];
  public focus: Focus;
  public currentPossibilities: Possibility[] = [];
  private stateHistory: History[] = [];

  public deathReason: string | null = null;
  public isGameEnded: boolean = false;

  constructor() {
    this.character = new CharacterCondition();
    this.focus = new Focus(false, true, false, true);
  }

  initialize() {
    this.age = 18;
    this.monthsElapsed = 0;

    this.character.balance = 10000;
    this.character.monthlyExpenses.add(1000);
    this.job = null;
    // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
    this.education.level.add(1);

    this.character.mentalHealth.add(80);
    this.character.physicalHealth.add(80);
    this.character.happiness.add(80);
    this.character.maxHealth.add(100);

    this.focus.health.set(true);
    this.focus.relation.set(false);
    this.focus.work.set(true);
    this.focus.hobby.set(false);
  }

  increaseMonthsElapsed() {
    this.monthsElapsed += 1;
  }

  getMonthsElapsed(): number {
    return this.monthsElapsed;
  }

  shouldGameEnd(): boolean {
    const deathResult = DeathCalculator.shouldGameEnd(this);

    if (deathResult.isDead) {
      this.isGameEnded = true;
      this.deathReason = deathResult.reason || "Unknown cause";
      return true;
    }

    return false;
  }

  setFocus(focus: Focus) {
    this.focus = focus;
  }

  applyMonthlyEffects() {
    console.log("Applying monthly effects...");

    // Handle Items
    this.items.forEach((item: Item) => {
      item.applyMonthlyEffects(this);
    });

    // Handle focuses
    this.focus.applyEffects(this);

    this.job?.applyMonthlyEffects(this);

    // Handle expences
    this.character.balance -= this.character.monthlyExpenses.get();
  }

  addItem(item: Item) {
    if (item.monthlyCost) {
      this.character.monthlyExpenses.add(item.monthlyCost);
    }
    this.items.push(item);
  }

  removeItem(item: Item) {
    if (item.monthlyCost) {
      this.character.monthlyExpenses.add(-item.monthlyCost);
    }
    this.items = this.items.filter((i) => i !== item);
  }

  updateHistory() {
    this.stateHistory.push({
      age: this.age,
      month: (this.getMonthsElapsed() % 12) + 1,
      characterCondition: this.character.clone(),
    });
  }

  getHistory(): History[] {
    return this.stateHistory;
  }
}
