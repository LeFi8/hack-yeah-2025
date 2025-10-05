import { Hobby } from "./hobby";
import { State } from "../../../state";

export class JoggingHobby extends Hobby {
  name = "Jogging";
  monthlyCost = 50;
  iconUrl = "jogging.png";

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 1 : 2);
    state.character.physicalHealth.add(state.focus.hobby ? 1 : 2);
  }
}
