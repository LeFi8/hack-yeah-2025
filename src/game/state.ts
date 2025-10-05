import { CharacterCondition } from "./character/character";
import { DeathCalculator } from "./death/deathCalculator";
import type { Item } from "./items";
import type { Possibility } from "./possibilities";
import { RangeCounter } from "./utils";
import { FocusTracker, type FocusStats } from "./utils/focus-tracker";
import type { History } from "./utils/history";
import { JobContract } from "./work";
import { ZUS } from "./zus/zus";

export class Focus {
  MAX_FOCUS_COUNT = 2;
  hobby: boolean = false;
  health: boolean = false;
  relation: boolean = false;
  work: boolean = false;

  constructor(
    hobby: boolean,
    health: boolean,
    relation: boolean,
    work: boolean,
  ) {
    this.hobby = hobby;
    this.health = health;
    this.relation = relation;
    this.work = work;
  }
  public countActiveFocus(): number {
    let count = 0;
    if (this.hobby) count++;
    if (this.health) count++;
    if (this.relation) count++;
    if (this.work) count++;
    return count;
  }

  public toggle(field: "hobby" | "health" | "relation" | "work"): boolean {
    if (this.countActiveFocus() >= this.MAX_FOCUS_COUNT && !this[field]) {
      return false; // Do not allow more than MAX_FOCUS_COUNT active focuses
    }
    this[field] = !this[field];
    return true;
  }

  private chance(probability: number): boolean {
    return Math.random() < probability;
  }

  applyEffects(_state: State) {
    // If Health focus is active you have 70% to increase health,
    // otherwise 50% to decrease it
    if (this.health && this.chance(0.7)) {
      _state.character.physicalHealth.add(1);
    } else if (this.chance(0.5)) {
      _state.character.physicalHealth.add(-1);
    }

    // If Relation focus is active you have 80% to increase hapiness
    // and 60% to increase mental health,
    // otherwise 50% to decrease happiness and mental health
    if (this.relation) {
      if (this.chance(0.8)) {
        _state.character.happiness.add(1);
      }
    } else if (this.chance(0.5)) {
      _state.character.happiness.add(-1);
    }

    // If we focus on work we have like 15% chance
    // of decrasing mental health, physical health and happiness
    if (!this.work) {
      if (this.chance(0.15)) {
        _state.character.physicalHealth.add(-1);
      }
      if (this.chance(0.15)) {
        _state.character.happiness.add(-1);
      }
    }

    if (this.hobby && this.chance(0.6)) {
      _state.character.happiness.add(1);
    }
  }
}

export class Education {
  // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
  level = new RangeCounter(0, 0, 4);
  isStudying: boolean = false;
  studyingSinceMonth: number = 0;

  applyMonthlyEffects() {}
}

export class State {
  public age: number = 0;
  private monthsElapsed: number = 0; // Track months since game start
  public character: CharacterCondition;
  public job: JobContract | null = null;
  public education: Education = new Education();
  public zus = new ZUS();
  public items: Item[] = [];
  public focus: Focus;
  public currentPossibilities: Possibility[] = [];
  private stateHistory: History[] = [];
  public focusTracker: FocusTracker = new FocusTracker(); // Add this line

  public deathReason: string | null = null;
  public isGameEnded: boolean = false;

  constructor() {
    this.character = new CharacterCondition();
    this.focus = new Focus(true, false, false, true);
  }

  initialize() {
    this.age = 44;
    this.monthsElapsed = 0;

    this.character.balance = 10000;
    this.character.monthlyExpenses.add(1800);
    this.job = null;
    // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
    this.education.level.add(1);

    this.character.physicalHealth.add(80);
    this.character.happiness.add(80);
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

    // Track focus before applying effects
    this.focusTracker.trackFocus(this.focus);

    if (this.getMonthsElapsed() % 12 === 0) {
      this.character.applyInflation();
    }

    this.character.applyMonthlyEffects();

    // Handle Items
    this.items.forEach((item: Item) => {
      item.applyMonthlyEffects(this);
    });

    // Handle focuses
    this.focus.applyEffects(this);

    this.job?.applyMonthlyEffects(this);

    // ZUS
    this.zus.applyMonthlyEffects(this);

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

  finishJob() {
    this.job = null;
  }

  getFocusStatistics(): FocusStats {
    return this.focusTracker.getAverages(this.monthsElapsed);
  }
}
