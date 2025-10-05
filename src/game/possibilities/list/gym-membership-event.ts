import { Possibility } from "../possibility";
import { GymMembership } from "../../items/list/gym-membership";

export class GymMembershipEvent extends Possibility {
  title = "Buy gim membership";

  getOptions() {
    return [
      {
        title: "Buy membership for 1 year",
        applyEffects: () => {
          this.state.addItem(new GymMembership(1 * 12));
        },
      },
      {
        title: "Commit for 10 years",
        applyEffects: () => {
          this.state.addItem(new GymMembership(10 * 12));
        },
      },
    ];
  }

  canActivate() {
    return !this.state.items.some((i) => i instanceof GymMembership);
  }
  getWeight() {
    if (this.state.focus.health || this.state.focus.hobby) {
      return 3;
    }
    return 1;
  }
}
