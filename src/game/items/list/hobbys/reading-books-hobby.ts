import { Hobby } from "./hobby";
import { State } from "../../../state";

export class ReadingBooksHobby extends Hobby {
  monthlyCost = 50;

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 1 : 2);
    state.character.mentalHealth.add(state.focus.hobby ? 1 : 2);
  }
}
