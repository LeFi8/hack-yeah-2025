import { State } from "../../state";
import type { Possibility } from "../possibility";
import { Waiter } from "../../work";

export class WorkWaiter implements Possibility {
  title = "You decided to become a waiter";

  getOptions(_state: State) {
    return [
      {
        title: "Waiter - Contract with full contributions",
        applyEffects: (state: State) => {
          state.job = new Waiter("UOP");
        },
      },
      {
        title: "Waiter - Civil law contract",
        applyEffects: (state: State) => {
          state.job = new Waiter("UZ");
        },
      },
      {
        title: "Waiter - Unregistered work",
        applyEffects: (state: State) => {
          state.job = new Waiter("UNREGISTERED");
        },
      },
    ];
  }

  canActivate = (state: State) => {
    return !state.job;
  };
  getWeight = (_state: State) => {
    return 100;
  };
}
