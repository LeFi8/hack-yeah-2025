import type { State } from "../../../state";
import { Diet } from "./diet";

export class FastFoodDiet extends Diet {
  name = "Fast Food Diet";
  monthlyCost = 80;
  iconUrl = "fast_food.png";

  applyMonthlyEffects(state: State) {
    state.character.physicalHealth.add(-2);
    state.character.happiness.add(2);
  }
}
