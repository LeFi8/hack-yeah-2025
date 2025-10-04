import type { Event } from "../event";
import type { State } from "../../state";

export class WorkLvlUpgrade implements Event {
  private description: string;

  canActivate = (state: State) => {
    this.description = `You are ${state.job?.getNextLvlContract()} now!`
    return state.job?.canUpgrade()
  };
  applyEffects = (state: State) => {
    state.job?.upgrade()
  };
  getTitle = () => {
    return "You got a promotion at work";
  };
  getDescription = () => {
    return this.description;
  };
  getWeight = (state: State) => {
    let weight =  5;
    if (state.focus.work) {
      weight = weight * 10
    }

    return weight;
  };
}
