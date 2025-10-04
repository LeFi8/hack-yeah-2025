import {State} from "./state.ts";
import type {Possibility} from "./posibilities.ts";

export class Game {
  private state: State = new State();

  // private historyOfPossibilities: Possibility[]
  // private historyOfEvents: Event[]
  // private historyOfState: State[]

  start() {
    // init random state
  }

  nextStep() {
    // change your state according to your focus
    // change your state according to your items
    // get random events and apply their effects
    // get random possibilities and set to this.currentPossibilities
  }

  selectPossibility(possibility: Possibility, selectedOption: number) {
    possibility.options[selectedOption].applyEffects(this.state)
  }

  selectFocus() {

  }

  finish() {

  }
}