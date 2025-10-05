import type { State } from "../../../state";
import { Diet } from "./diet";

export class FastFoodDiet extends Diet {
  monthlyCost = 80;
  iconUrl = "src/assets/zus_icon.png";

  applyMonthlyEffects(state: State) {
    state.character.physicalHealth.add(-2);
    state.character.happiness.add(2);
  }
}
