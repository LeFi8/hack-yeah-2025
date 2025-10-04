import type { Event } from "../event";
import type { State } from "../../state";

export class HelpedNeighbor implements Event {
  canActivate = (state: State) => {
    return state.focus.relation.get();
  };
  applyEffects = (state: State) => {
    state.character.happiness.add(3);
    state.character.mentalHealth.add(2);
  };
  getTitle = () => {
    return "You helped a neighbor";
  };
  getDescription = () => {
    return `Your neighbor needed help carrying groceries. You offered your assistance, which made you feel good and strengthened your sense of community.`;
  };
  getWeight = (state: State) => {
    if (state.focus.relation.get()) {
      return 2;
    }
    return 1;
  };
}
