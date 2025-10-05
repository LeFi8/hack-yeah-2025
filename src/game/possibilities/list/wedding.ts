import { Possibility } from "../possibility";
import { Cat, type Item } from "../../items";
import { Girlfriend } from "../../items/list/partners/girlfriend.ts";
import { Wife } from "../../items/list/partners/wife.ts";

export class Wedding extends Possibility {
  title = "Time to get married!";
  getOptions() {
    return [
      {
        title: `It's your day! Extravagant wedding with 200 guests, live band and open bar`,
        applyEffects: () => {
          this.state.character.happiness.add(100);
          this.state.character.balance -= 50000;
          const girlfriend = this.state.items.find(
            (i: Item) => i instanceof Girlfriend,
          ) as Girlfriend;
          if (girlfriend) {
            this.state.removeItem(girlfriend);
            this.state.addItem(new Wife());
          }
        },
      },
      {
        title: "Small wedding with close friends and family",
        applyEffects: () => {
          this.state.character.happiness.add(100);
          this.state.character.balance -= 10000;
          const girlfriend = this.state.items.find(
            (i: Item) => i instanceof Girlfriend,
          ) as Girlfriend;
          if (girlfriend) {
            this.state.removeItem(girlfriend);
            this.state.addItem(new Wife());
          }
        },
      },
    ];
  }
  canActivate = () => {
    return !this.state.items.some((i) => i instanceof Cat);
  };
  getWeight = () => {
    return 1;
  };
}
