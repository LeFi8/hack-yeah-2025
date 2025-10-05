import { Focus, State } from "./state";
import { PossibilityManager, type Possibility } from "./possibilities";
import { EventManager, type Event } from "./events";
import type { History } from "./utils/history";
import type { FocusStats } from "./utils/focus-tracker";

export interface GameTickResult {
  possibilities: Possibility[];
  event: Event | null;
  state: State;
  isFinished: boolean;
}

export class Game {
  private state: State = new State();
  private eventManager = new EventManager();
  private possibilityManager = new PossibilityManager();
  private currentPossibilities: Possibility[] = [];
  private gameRunning: boolean = false;

  private EVENT_FREQUENCY_MONTHS = 40;
  private POSSIBILITY_FREQUENCY_MONTHS = 24;

  getCurrentPossibilities(): Possibility[] {
    return this.currentPossibilities;
  }

  start() {
    if (!this.gameRunning) {
      this.gameRunning = true;
    }

    this.state.initialize();
  }

  tick(): GameTickResult {
    if (!this.gameRunning) {
      throw new Error("Game not started");
    }

    this.state.updateHistory();

    this.state.increaseMonthsElapsed();

    // Apply monthly state changes
    this.state.applyMonthlyEffects();

    // Age up every 12 months (1 year)
    if (this.state.getMonthsElapsed() % 12 === 0) {
      this.state.age += 1;
    }

    // Generate possibilities every 12 months
    const possibilities =
      this.state.getMonthsElapsed() % this.POSSIBILITY_FREQUENCY_MONTHS === 1
        ? this.generatePossibilities()
        : [];

    const event =
      this.state.getMonthsElapsed() % this.EVENT_FREQUENCY_MONTHS === 0
        ? this.processRandomEvent()
        : null;

    // Check if game should end
    if (this.state.shouldGameEnd()) {
      this.finish();
    }

    return {
      possibilities,
      event,
      state: this.state,
      isFinished: this.state.shouldGameEnd(),
    };
  }

  selectPossibility(possibility: Possibility, selectedOption: number) {
    if (
      selectedOption < 0 ||
      selectedOption >= possibility.getOptions().length
    ) {
      throw new Error("Invalid option selected");
    }

    possibility.getOptions()[selectedOption].applyEffects(this.state);
  }

  selectFocus(focus: Focus) {
    this.state.setFocus(focus);
  }

  // Updated methods to return data instead of storing internally
  private processRandomEvent(): Event | null {
    const event: Event | null = this.eventManager.getRandom(this.state);

    if (event) {
      // Update Event Manager history so it won't cause same event again
      this.eventManager.addEventToHistory(
        event,
        (this.state.getMonthsElapsed() % 12) + 1,
        this.state.age,
      );

      event.applyEffects();
      console.log(`Event occurred: ${event.getTitle()}`);
      console.log(`Description: ${event.getDescription()}`);
    }

    return event;
  }

  private generatePossibilities(): Possibility[] {
    const possibilities: Possibility[] = this.possibilityManager.getRandom(
      this.state,
    );
    this.currentPossibilities = possibilities;
    return possibilities;
  }

  getMonthsElapsed(): number {
    return this.state.getMonthsElapsed();
  }

  getYearsElapsed(): number {
    return Math.floor(this.getMonthsElapsed() / 12);
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

  getHistory(): History[] {
    return this.state.getHistory();
  }

  getFocusStatistics(): FocusStats {
    return this.state.getFocusStatistics();
  }
}
