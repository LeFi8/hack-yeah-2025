import {State} from "../../state";
import type {Item} from "../item";

export class Depression implements Item {
  private monthsLeft: number
  constructor() {
    this.monthsLeft = Math.random() * 10
  }

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(-1)
    this.monthsLeft--
    if (this.monthsLeft <= 0) {
        state.removeItem(this)
    }
  }
}
