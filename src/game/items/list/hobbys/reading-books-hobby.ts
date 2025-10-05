import { Hobby } from "./hobby";
import { State } from "../../../state";

export class ReadingBooksHobby extends Hobby {
  name = "Reading Books";
  monthlyCost = 50;
  iconUrl = "reading.png";

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 1 : 2);
  }
}
