import { Possibility } from "../possibility";
import { Girlfriend } from "../../items/list/partners/girlfriend.ts";
import type { Item } from "../../items";

export class ProposeToGirlfriend extends Possibility {
  title = "About your relationship";
  getOptions() {
    return [
      {
        title: "Propose to your girlfriend",
        applyEffects: () => {
          const girlfriend = this.state.items.find(
            (item: Item) => item instanceof Girlfriend,
          ) as Girlfriend;
          if (girlfriend) {
            girlfriend.isEngaged = true;
          }
        },
      },
      {
        title: "Maybe later...",
        applyEffects: () => {
          const girlfriend = this.state.items.find(
            (item: Item) => item instanceof Girlfriend,
          ) as Girlfriend;
          if (girlfriend) {
            girlfriend.resignedFromProposing = true;
          }
        },
      },
    ];
  }
  canActivate = () => {
    return !this.state.items.some(
      (item: Item) =>
        item instanceof Girlfriend &&
        item.monthsToMarriageDecision <= 0 &&
        !item.resignedFromProposing &&
        !item.isEngaged,
    );
  };
  getWeight = () => {
    return 3;
  };
}
