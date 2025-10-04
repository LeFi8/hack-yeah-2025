import { Hobby } from "./hobby";
import { State } from "../../../state";

export class VideoGamesHobby extends Hobby {
  monthlyCost = 50;

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 2 : 4);
    state.character.physicalHealth.add(-1);
  }
}
