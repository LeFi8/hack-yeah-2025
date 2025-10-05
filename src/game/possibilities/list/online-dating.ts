import { Possibility } from "../possibility";
import { Friend } from "../../items/list/friend";

export class OnlineDating extends Possibility {
  title = "You decided to try online dating";

  getOptions() {
    return [
      {
        title: "Create a profile and start swiping",
        applyEffects: () => {
          if (Math.random() < 0.6) {
            this.state.addItem(new Friend());
            this.state.character.happiness.add(3);
          } else {
            this.state.character.happiness.add(-1);
          }
        },
      },
      {
        title: "Just browse without commitment",
        applyEffects: () => {
          this.state.character.happiness.add(1);
        },
      },
      {
        title: "Decide it's not for you",
        applyEffects: () => {},
      },
    ];
  }

  canActivate() {
    return (
      !this.state.items.some((i) => i instanceof Friend) &&
      (this.state.age < 20 || this.state.age > 50)
    );
  }

  getWeight() {
    if (this.state.focus.relation) {
      return 2;
    }
    return 1;
  }
}
