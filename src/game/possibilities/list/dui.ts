import { Possibility } from "../possibility";
import { Car } from "../../items/list/car.ts";
import { ArrestWarrant } from "../../items/list/arrest-warrant.ts";
import type { Item } from "../../items";

export class DrivingUnderInfluence extends Possibility {
  title = "Come home from party";
  getOptions() {
    return [
      {
        title: "Drive home (you've had some beers)",
        applyEffects: () => {
          this.state.addItem(new ArrestWarrant());
          this.state.character.physicalHealth.add(-5);
        },
      },
      {
        title: "Take a taxi ",
        applyEffects: () => {
          this.state.character.balance -= 20;
        },
      },
    ];
  }
  canActivate() {
    return (
      this.state.items.some((i: Item) => i instanceof Car) &&
      !this.state.items.some((i: Item) => i instanceof ArrestWarrant)
    );
  }
  getWeight() {
    return 1;
  }
}
