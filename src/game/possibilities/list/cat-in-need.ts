import { Possibility } from "../possibility";
import { Cat } from "../../items";

export class CatInNeed extends Possibility {
  title = "You found homeless cat. It looks hungry and cold";
  getOptions() {
    return [
      {
        title: "Adopt it",
        applyEffects: () => {
          this.state.addItem(new Cat());
        },
      },
      {
        title: "Carry it to shelter",
        applyEffects: () => {
          this.state.character.happiness.add(2);
        },
      },
    ];
  }
  canActivate() {
    return !this.state.items.some((i) => i instanceof Cat);
  }
  getWeight() {
    return 1;
  }
}
