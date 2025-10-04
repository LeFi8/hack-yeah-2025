import type {State} from "../../../state.ts";
import {Diet} from "./diet.ts";

export class FastFoodDiet extends Diet {
    monthlyCost = 80

    applyMonthlyEffects(state: State) {
        state.character.physicalHealth.add(-2)
        state.character.happiness.add(2)
    }
}