import { Possibility } from "../possibility";
import { RomanticPartner } from "../../items/list/partners/romantic-partner.ts";
import { Girlfriend } from "../../items/list/partners/girlfriend.ts";
import { Friend } from "../../items/list/friend.ts";

export class FindLifePartner extends Possibility {
  title = "New person in your life";
  getOptions() {
    return [
      {
        title: "Become romantic partners",
        applyEffects: () => {
          this.state.addItem(new Girlfriend());
        },
      },
      {
        title: "Not interested in relationship",
        applyEffects: () => {
          this.state.addItem(new Friend());
        },
      },
    ];
  }
  canActivate = () => {
    return (
      !this.state.items.some((i) => i instanceof RomanticPartner) &&
      this.state.focus.relation.get()
    );
  };
  getWeight = () => {
    return 3;
  };
}
