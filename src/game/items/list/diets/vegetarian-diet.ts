import { Diet } from "./diet";
import type { State } from "../../../state";

export class VegetarianDiet extends Diet {
  monthlyCost: number;
  iconUrl = "src/assets/zus_icon.png";

  constructor(monthlyCost = 100) {
    super();
    this.monthlyCost = monthlyCost;
  }
  applyMonthlyEffects(state: State) {
    state.character.physicalHealth.add(1);
    state.character.happiness.add(-1);
  }
}
