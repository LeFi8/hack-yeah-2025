import {State} from "../../state";
import type {Item} from "../item";

export class Cat implements Item {
  private monthsLeft: number
  constructor() {
    this.monthsLeft = Math.random() * 50
  }

  applyMonthlyEffects(state: State) {
    state.character.balance -= 20
    // state.character.happiness++
    this.monthsLeft--
    if (this.monthsLeft <= 0) {
      // remove cat from items
      // add depression to items
    }
  }
}
