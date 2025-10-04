import {Focus, State} from "./state.ts";
import { PossibilityManager, type Possibility} from "./possibilities";
import { EventManager, type Event } from "./events";

export interface GameTickResult {
  possibilities: Possibility[];
  events: Event[];
  state: State;
}

export class Game {
  private state: State = new State();
  private eventManager = new EventManager();
  private possibilityManager = new PossibilityManager();
  private currentPossibilities: Possibility[] = [];
  private gameRunning: boolean = false;
  private monthsElapsed: number = 0; // Track months since game start

  // private historyOfPossibilities: Possibility[]
  // private historyOfEvents: Event[]
  // private historyOfState: State[]

  getCurrentPossibilities(): Possibility[] {
    return this.currentPossibilities
  }

  start() {
    if (!this.gameRunning) {
      this.gameRunning = true;
    }

    this.state.initialize();
    this.monthsElapsed = 0;
  }

  tick(): GameTickResult {
    if (!this.gameRunning) {
      throw new Error("Game not started");
    }

    this.monthsElapsed++;

    // Apply monthly state changes
    this.state.applyMonthlyEffects();

    // Age up every 12 months (1 year)
    if (this.monthsElapsed % 12 === 0) {
      this.state.age += 1;
    }

    // Generate possibilities every 12 months
    const possibilities = this.monthsElapsed % 12 === 0 
      ? this.generatePossibilities() 
      : [];

    // Generate events every 6 months
    const events = this.monthsElapsed % 6 === 0 
      ? this.processRandomEvents() 
      : [];

    // Check if game should end
    if (this.state.shouldGameEnd()) {
      this.finish();
    }

    return {
      possibilities,
      events,
      state: this.state
    };
  }

  selectPossibility(possibility: Possibility, selectedOption: number) {
    if (selectedOption < 0 || selectedOption >= possibility.options.length) {
      throw new Error("Invalid option selected");
    }

    possibility.options[selectedOption].applyEffects(this.state);
    
    // Remove used possibility
    this.currentPossibilities = this.currentPossibilities.filter(
      p => p !== possibility
    );
  }

  selectFocus(focus: Focus) {
    this.state.setFocus(focus);
  }

  // Updated methods to return data instead of storing internally
  private processRandomEvents(): Event[] {
    const events: Event[] = this.eventManager.getRandom(this.state);
    events.forEach(event => event.applyEffects(this.state));
    return events;
  }

  private generatePossibilities(): Possibility[] {
    const possibilities: Possibility[] = this.possibilityManager.getRandom(this.state);
    this.currentPossibilities = possibilities;
    return possibilities;
  }

  getMonthsElapsed(): number {
    return this.monthsElapsed;
  }

  getYearsElapsed(): number {
    return Math.floor(this.monthsElapsed / 12);
  }

  finish() {
    this.gameRunning = false;
  }

  isGameRunning(): boolean {
    return this.gameRunning;
  }

  getState(): State {
    return this.state;
  }
}