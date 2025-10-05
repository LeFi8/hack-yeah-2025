import { Hobby } from "./hobby";
import { State } from "../../../state";

export class VideoGamesHobby extends Hobby {
  name = "Video Games";
  monthlyCost = 50;
  iconUrl = "video_games.png";

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(state.focus.hobby ? 2 : 4);
    state.character.physicalHealth.add(-1);
  }
}
