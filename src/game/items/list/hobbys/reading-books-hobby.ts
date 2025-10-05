import { Hobby } from "./hobby";
import { State } from "../../../state";

export class ReadingBooksHobby extends Hobby {
  monthlyCost = 50;
  iconUrl = "src/assets/zus_icon.png";

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 1 : 2);
  }
}
