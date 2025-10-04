import {State} from "../../state";
import type {Possibility} from "../possibility";
import {GymMembership} from "../../items/list/gym-membership";

export class GymMembershipEvent implements Possibility {
  title = "Buy gim membership";

  getOptions(_state: State) {
    return [
      {
        title: 'Buy membership for 1 year',
        applyEffects: (state: State) => {
          state.addItem(new GymMembership(1 * 12))
        }
      },
      {
        title: 'Commit for 10 years',
        applyEffects: (state: State) => {
          state.addItem(new GymMembership(10 * 12))
        }
      },
    ]
  }

  canActivate = (state: State) => {
    return !state.items.some(i => i instanceof GymMembership);
  };
  getWeight = (state: State) => {
    if (state.focus.health || state.focus.hobby) {
      return 3
    }
    return 1
  }
}