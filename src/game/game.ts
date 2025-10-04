import {Focus, State} from "./state.ts";
import { PossibilityManager, type Possibility} from "./possibilities";
import { EventManager, type Event } from "./events";

export class Game {
  private state: State = new State();
  private eventManager = new EventManager();
  private possibilityManager = new PossibilityManager();
  private currentPossibilities: Possibility[] = [];
  private gameRunning: boolean = false;

  // private historyOfPossibilities: Possibility[]
  // private historyOfEvents: Event[]
  // private historyOfState: State[]

  start() {
    if (!this.gameRunning) {
      this.gameRunning = true;
    }

    this.state.initialize();
  }

  nextStep() {
    if (!this.gameRunning) {
      throw new Error("Game not started");
    }

    // this.state.applyFocusEffects();
    // this.state.applyItemsEffects();

    this.processRandomEvents();

    this.generatePossibilities();


    if (this.state.shouldGameEnd()) {
      this.finish();
    }
  }

  selectPossibility(possibility: Possibility, selectedOption: number) {
    if (selectedOption <= 0 || selectedOption >= possibility.options.length) {
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

  private processRandomEvents() {
    const events: Event[] = this.eventManager.getRandom(this.state);
    events.forEach(event => event.applyEffects(this.state));
  }

  private generatePossibilities() {
    const possibilities: Possibility[] = this.possibilityManager.getRandom(this.state);
    this.currentPossibilities = possibilities;
  }

  finish() {
    this.gameRunning = false;
  }
}